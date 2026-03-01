import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import BodyPhotoPicker from '@/components/style-swap/body-photo';
import GenerateButton from '@/components/style-swap/generate';
import ItemPhotoPicker from '@/components/style-swap/item-photo';
import { StyleDescription } from '@/components/style-swap/style-description';

import { useState } from 'react';
import { View } from 'react-native';

export default function StyleSwapScreen() {
  const [description, setDescription] = useState('');

  return (
    <ThemedScroller className="flex-1">
      <View className="flex-1">
        <ThemedText className="my-5 text-center text-xl font-semibold">StyleSwap</ThemedText>

        <ThemedText className="text-base font-semibold">Body Photo</ThemedText>
        <ThemedText className="mb-3 text-gray-500">
          Upload a photo of yourself for the try-on
        </ThemedText>

        <BodyPhotoPicker />

        <ThemedText className="mt-5 text-base font-semibold">Sample Items</ThemedText>
        <ItemPhotoPicker />
      </View>

      <View className="flex-1">
        <ThemedText className="mt-5 text-base font-semibold">
          Describe Your Style Request (Optional)
        </ThemedText>
        <StyleDescription value={description} onChange={setDescription} />
      </View>

      <GenerateButton description={description} />
    </ThemedScroller>
  );
}
