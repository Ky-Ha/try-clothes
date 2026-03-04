import { View } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';
import ThemedText from '@/components/ThemedText';
import ThemedScroller from '@/components/ThemeScroller';

export default function MyTattoosScreen() {
  const tattoos: any[] = []; // your data

  if (tattoos.length === 0) {
    return <MyTattoosEmpty />;
  }

  return (
    // your FlatList / content here
    null
  );
}

function MyTattoosEmpty() {
  return (
    <ThemedScroller className="flex-1 px-6 pt-4">
      <View className="mb-6 flex-row items-center justify-between">
        <ThemedText className="text-2xl font-bold">My Tattoos</ThemedText>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        {/* Icon */}
        <View className="mb-4">
          <ImageIcon size={48} color="#FFD400" />
        </View>

        {/* Title */}
        <ThemedText className="mb-2 text-xl font-semibold">No tattoos saved yet</ThemedText>

        {/* Subtitle */}
        <ThemedText className="text-center text-sm leading-5">
          Create and save your first tattoo design! Swipe down to refresh.
        </ThemedText>
      </View>
    </ThemedScroller>
  );
}
