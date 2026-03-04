import { View, Text } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';

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
    <View className="flex-1 items-center justify-center bg-black px-6">
      {/* Icon */}
      <View className="mb-4">
        <ImageIcon size={48} color="#FFD400" />
      </View>

      {/* Title */}
      <Text className="mb-2 text-xl font-semibold text-white">No tattoos saved yet</Text>

      {/* Subtitle */}
      <Text className="text-center text-sm leading-5 text-gray-500">
        Create and save your first tattoo design! Swipe down to refresh.
      </Text>
    </View>
  );
}
