import ThemedScroller from '@/components/ThemeScroller'
import ThemedText from '@/components/ThemedText'
import { useResultStore } from '@/store/result'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import {
    Image,
    ImageBackground,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ResultStyleScreen() {
  const resultImage = useResultStore((state) => state.resultImage)
  const itemImages = useResultStore((state) => state.itemImages)

  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  if (!resultImage) {
    return (
      <View className="flex-1">
        <View style={{ paddingTop: insets.top }}>
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} />
              <ThemedText className="text-xl font-semibold">
                Style Result
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 items-center justify-center">
          <ThemedText className="text-lg">Something went wrong!</ThemedText>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1">
      {/* ================= SCROLL CONTENT ================= */}
      <ThemedScroller
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 140, // 🔴 reserve space for fixed button
        }}
      >
        {/* HEADER */}
        <View style={{ paddingTop: insets.top }}>
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} />
              <ThemedText className="text-xl font-semibold">
                Style Result
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT */}
        <View className="flex-1">
          {/* RESULT IMAGE */}
          <View
            style={{
              width: width - 50,
              height: (height * 3) / 5,
            }}
            className="relative rounded-2xl overflow-hidden bg-red-400"
          >
            <ImageBackground
              source={
                typeof resultImage === 'string'
                  ? { uri: resultImage }
                  : resultImage
              }
              resizeMode="stretch"
              imageStyle={{ alignSelf: 'flex-start' }} // ✅ TOP aligned
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          {/* OUTFIT DETAILS */}
          <ThemedText className="font-semibold text-base mt-6 mb-3">
            Outfit Details
          </ThemedText>

          <View className="flex-row flex-wrap gap-3">
            {itemImages.map((img, index) => (
              <View
                key={index}
                className="w-16 h-16 rounded-full border border-gray-300 items-center justify-center overflow-hidden"
              >
                <Image
                  source={{ uri: img }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        </View>
      </ThemedScroller>

      {/* ================= FIXED BOTTOM BUTTON ================= */}
      <View
        style={{ paddingBottom: insets.bottom + 10 }}
        className="absolute bottom-0 left-0 right-0 px-4 pb-4"
      >
        <TouchableOpacity
          onPress={() => {
            console.log('Do something')
          }}
          activeOpacity={0.85}
          className="bg-black rounded-2xl py-4 items-center justify-center"
        >
          <ThemedText className="text-white font-semibold text-base">
            Do something
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  )
}
