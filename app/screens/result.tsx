import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { useResultStore } from '@/store/result';

import { router } from 'expo-router';
import { Image, ImageBackground, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResultStyleScreen() {
  const resultImage = useResultStore((state) => state.resultImage);
  const itemImages = useResultStore((state) => state.itemImages);

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  if (!resultImage) {
    return (
      <View className="flex-1 px-4">
        <View style={{ paddingTop: insets.top }}>
          <View className="mb-6 flex-row items-center">
            <TouchableOpacity className="flex-row items-center gap-2" onPress={() => router.back()}>
              <Icon name="ChevronRight" size={24} />
              <ThemedText className="text-xl font-semibold">Style Result</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 items-center justify-center">
          <ThemedText className="text-lg">Something went wrong!</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View className="relative flex-1">
      <ThemedScroller
        className="flex-1 px-4"
        contentContainerStyle={{
          paddingBottom: 140, // 🔴 reserve space for fixed button
        }}>
        {/* ================= SCROLL CONTENT ================= */}

        {/* HEADER */}
        <View style={{ paddingTop: insets.top }}>
          <View className="mb-6 flex-row items-center">
            <TouchableOpacity className="flex-row items-center gap-2" onPress={() => router.back()}>
              <Icon name="ChevronLeft" size={24} />
              <ThemedText className="text-2xl font-semibold">Style Result</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT */}
        <View className="flex-1">
          {/* RESULT IMAGE */}
          <View
            style={{
              width: width - 50,
              height: height / 2,
            }}
            className="relative overflow-hidden rounded-2xl bg-red-400">
            <ImageBackground
              source={typeof resultImage === 'string' ? { uri: resultImage } : resultImage}
              resizeMode="stretch"
              imageStyle={{ alignSelf: 'flex-start' }} // ✅ TOP aligned
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          {/* OUTFIT DETAILS */}
          <ThemedText className="mb-3 mt-6 text-base font-semibold">Outfit Details</ThemedText>

          <View className="flex-row flex-wrap gap-3">
            {itemImages.map((img, index) => (
              <View
                key={index}
                className="h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gray-300">
                <Image source={{ uri: img }} className="h-full w-full" resizeMode="contain" />
              </View>
            ))}
          </View>
        </View>

        {/* ================= FIXED BOTTOM BUTTON ================= */}
      </ThemedScroller>
      <View className="absolute bottom-2 left-0 right-0 mx-6 my-4">
        <TouchableOpacity
          onPress={() => {
            console.log('Do something');
          }}
          activeOpacity={0.85}
          className="items-center justify-center rounded-2xl bg-black py-4">
          <ThemedText className="text-base font-semibold text-white">Do something</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
