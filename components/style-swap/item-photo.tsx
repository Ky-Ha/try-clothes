import { useItemStore } from '@/store/item'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system/legacy'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const MAX_IMAGES = 3

export default function ItemPhotoPicker() {
  const { images, setImages, removeImage } = useItemStore()

  const pickImage = async (
    requestPermission: () => Promise<{ granted: boolean }>,
    launch: (
      options?: ImagePicker.ImagePickerOptions,
    ) => Promise<ImagePicker.ImagePickerResult>,
    permissionMessage: string,
    additionalOptions: ImagePicker.ImagePickerOptions = {},
  ) => {
    if (images.length >= MAX_IMAGES) {
      Alert.alert('Maximum Reached', 'You can only upload up to 3 images.')
      return
    }

    const { granted } = await requestPermission()
    if (!granted) {
      Alert.alert('Permission required', permissionMessage)
      return
    }

    try {
      const result = await launch({
        allowsEditing: true, // Allow user to crop/edit after capture/select
        base64: true,
        quality: 0.3, // Lower quality to reduce size
        ...additionalOptions,
      })

      if (result.canceled || !result.assets?.length) return

      const asset = result.assets[0]

      // Validate file size using expo-file-system
      const fileInfo = await FileSystem.getInfoAsync(asset.uri)

      if (!('exists' in fileInfo) || !fileInfo.exists || !('size' in fileInfo))
        return

      const size = fileInfo.size ?? 0

      if (size > MAX_FILE_SIZE) {
        Alert.alert(
          'Image Too Large',
          'The selected image is too large. Please take a closer photo or select a smaller image.',
        )
        return
      }

      let image: string

      if (asset.base64) {
        const mime = asset.mimeType ?? 'image/jpeg'
        image = `data:${mime};base64,${asset.base64}`
      } else {
        image = asset.uri
      }

      setImages([...images, image])
    } catch (error) {
      console.error('Error picking or processing image:', error)
      Alert.alert('Error', 'Failed to pick or process image. Please try again.')
    }
  }

  return (
    <View className="flex-1 mt-2">
      {/* ===== TOP (FIXED) ===== */}
      <View className="flex-row flex-wrap gap-3">
        {images.map((img, index) => (
          <View
            key={index}
            className="w-16 h-16 rounded-full border border-gray-300 items-center justify-center overflow-hidden"
          >
            <Image
              source={{ uri: img }}
              className="w-full h-full"
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              className="absolute top-2 right-1 bg-black/70 rounded-full p-1"
            >
              <Ionicons name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Upload slot - only show when < 3 images */}
        {images.length < 5 && (
          <TouchableOpacity
            onPress={() =>
              pickImage(
                ImagePicker.requestMediaLibraryPermissionsAsync,
                ImagePicker.launchImageLibraryAsync,
                'Gallery access is needed to upload photos.',
              )
            }
            className="w-16 h-16 rounded-full bg-pink-400 items-center justify-center"
          >
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
