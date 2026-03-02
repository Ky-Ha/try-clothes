import { useBodyStore } from '@/store/body';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGES = 1;

export default function BodyPhotoPicker() {
  const { images, setImages, removeImage } = useBodyStore();

  const pickImage = async (
    requestPermission: () => Promise<{ granted: boolean }>,
    launch: (options?: ImagePicker.ImagePickerOptions) => Promise<ImagePicker.ImagePickerResult>,
    permissionMessage: string,
    additionalOptions: ImagePicker.ImagePickerOptions = {}
  ) => {
    if (images.length >= MAX_IMAGES) {
      Alert.alert('Maximum Reached', 'You can only upload up to 1 images.');
      return;
    }

    const { granted } = await requestPermission();
    if (!granted) {
      Alert.alert('Permission required', permissionMessage);
      return;
    }

    try {
      const result = await launch({
        allowsEditing: true, // Allow user to crop/edit after capture/select
        base64: true,
        quality: 0.3, // Lower quality to reduce size
        ...additionalOptions,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];

      // Validate file size using expo-file-system
      const fileInfo = await FileSystem.getInfoAsync(asset.uri);

      if (!('exists' in fileInfo) || !fileInfo.exists || !('size' in fileInfo)) return;

      const size = fileInfo.size ?? 0;

      if (size > MAX_FILE_SIZE) {
        Alert.alert(
          'Image Too Large',
          'The selected image is too large. Please take a closer photo or select a smaller image.'
        );
        return;
      }

      let image: string;

      if (asset.base64) {
        const mime = asset.mimeType ?? 'image/jpeg';
        image = `data:${mime};base64,${asset.base64}`;
      } else {
        image = asset.uri;
      }

      // setImages([...images, image]);
      setImages([image]);
    } catch (error) {
      console.error('Error picking or processing image:', error);
      Alert.alert('Error', 'Failed to pick or process image. Please try again.');
    }
  };

  return (
    <View className="flex-1">
      {/* ===== TOP (FIXED) ===== */}

      <View className="flex-row flex-wrap gap-3">
        {images.map((img, index) => (
          <View
            key={index}
            // className="relative aspect-[0.3/0.9] w-[30%] overflow-hidden rounded-2xl">
            className="relative aspect-[1/0.9] w-full overflow-hidden rounded-2xl">
            <Image source={{ uri: img }} className="h-full w-full" resizeMode="contain" />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              className="absolute right-1 top-2 rounded-full bg-black/70 p-1">
              <Ionicons name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Upload slot - only show when < 3 images */}
        {images.length < MAX_IMAGES && (
          <TouchableOpacity
            onPress={() =>
              pickImage(
                ImagePicker.requestMediaLibraryPermissionsAsync,
                ImagePicker.launchImageLibraryAsync,
                'Gallery access is needed to upload photos.'
              )
            }
            className="w-[31%] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300"
            style={
              images.length === 0 && {
                width: '100%',
                aspectRatio: '1/0.9',
                height: '100%',
              }
            }>
            <Ionicons name="add" size={40} color="#5834eb" />
            <Text className="text-base font-semibold">Tap</Text>
            <Text className="mt-1 text-sm text-gray-500">Add Photo</Text>
            <TouchableOpacity
              onPress={() =>
                pickImage(
                  ImagePicker.requestCameraPermissionsAsync,
                  ImagePicker.launchCameraAsync,
                  'Camera access is needed to take photos.'
                )
              }
              className="absolute bottom-3 right-1 flex-col items-center">
              <View className="bg h-11  w-11 items-center justify-center rounded-full">
                <Camera size={25} color={'black'} strokeWidth={2} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
