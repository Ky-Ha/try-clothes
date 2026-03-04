import ThemedText from '@/components/ThemedText';
import ThemedPlaceSecondary from '@/components/ThemePlaceHolder';
import ThemedScroller from '@/components/ThemeScroller';
import { homeData } from '@/lib/fake-data';
import { View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <ThemedScroller className="flex-1 bg-slate-200 px-6 pt-4">
      {/* HEADER */}
      <View className="mb-6 flex-row items-center justify-between">
        <ThemedText className="text-2xl font-bold">Inkigo AI</ThemedText>
        <ThemedText className="font-semibold text-yellow-400">New Tattoo</ThemedText>
      </View>

      {/* HERO ACTIONS */}
      <ThemedScroller horizontal showsHorizontalScrollIndicator={false} className="rounded-2xl">
        {homeData.heroActions.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.9} className="mr-3">
            <Image
              source={{ uri: item.image }}
              className="h-[160px] rounded-2xl"
              style={{ width: (width * 3) / 4 }}
            />
            <View className="absolute bottom-2 left-4 right-4">
              <ThemedPlaceSecondary className="text-lg font-semibold ">
                {item.title}
              </ThemedPlaceSecondary>
              <ThemedPlaceSecondary className="text-sm ">{item.subtitle}</ThemedPlaceSecondary>
            </View>
          </TouchableOpacity>
        ))}
      </ThemedScroller>

      {/* DISCOVER */}
      <ThemedText className="mb-4 mt-8 text-xl font-semibold ">Discover new styles</ThemedText>

      <ThemedScroller horizontal showsHorizontalScrollIndicator={false} className="rounded-2xl">
        {homeData.discoverStyles.map((item) => (
          <View key={item.id} className="mr-3">
            <Image
              source={{ uri: item.image }}
              className="rounded-2xl"
              style={{ width: width / 2.7, height: height / 3 }}
            />
            <View className="absolute bottom-2 left-4 right-4">
              <ThemedPlaceSecondary className="mt-2 text-center ">
                {item.title}
              </ThemedPlaceSecondary>
            </View>
          </View>
        ))}
      </ThemedScroller>

      {/* MORE STYLES */}
      <ThemedText className="mb-4 mt-8 text-xl font-semibold ">More styles</ThemedText>

      <ThemedScroller horizontal showsHorizontalScrollIndicator={false} className="rounded-2xl">
        {homeData.moreStyles.map((item) => (
          <View key={item.id} className="mr-3">
            <Image
              source={{ uri: item.image }}
              className="rounded-2xl"
              style={{ width: width / 2.7, height: height / 3 }}
            />
            <View className="absolute bottom-2 left-4 right-4">
              <ThemedPlaceSecondary className="mt-2 font-medium ">
                {item.title}
              </ThemedPlaceSecondary>
            </View>
          </View>
        ))}
      </ThemedScroller>

      {/* MOODS */}
      <ThemedText className="mb-4 mt-8 text-xl font-semibold ">Moods</ThemedText>

      <ThemedScroller horizontal showsHorizontalScrollIndicator={false} className="rounded-2xl">
        {homeData.moods.map((item) => (
          <View key={item.id} className="mb-10 mr-3">
            <Image
              source={{ uri: item.image }}
              className="rounded-2xl"
              style={{ width: width / 2.7, height: height / 3 }}
            />
            <View className="absolute bottom-2 left-4 right-4">
              <ThemedPlaceSecondary className="mt-2 font-medium ">
                {item.title}
              </ThemedPlaceSecondary>
            </View>
          </View>
        ))}
      </ThemedScroller>
    </ThemedScroller>
  );
}
