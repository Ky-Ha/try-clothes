import ThemKeyboardAwareScrollView from '@/components/ThemKeyboardAwareScrollView';
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
    <View className="relative flex-1">
      <ThemKeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={120}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        className="flex-1">
        {/* Header Section */}
        <View className="w-full">
          <ThemedText className="my-5 text-center text-xl font-bold">StyleSwap</ThemedText>

          <ThemedText className="text-base font-semibold">Body Photo</ThemedText>
          <ThemedText className="mb-3 text-gray-500">
            Upload a photo of yourself for the try-on
          </ThemedText>

          {/* Ensure BodyPhotoPicker has its own internal height or aspect ratio */}
          <BodyPhotoPicker />

          <ThemedText className="mt-6 text-base font-semibold">Sample Items</ThemedText>
          <ItemPhotoPicker />
        </View>

        {/* Description Section */}
        <View className="mt-6 w-full">
          <ThemedText className="text-base font-semibold">
            Describe Your Style Request (Optional)
          </ThemedText>
          <StyleDescription value={description} onChange={setDescription} />
        </View>

        {/* Button Section */}

        <View className="mx-6 my-4">
          <GenerateButton description={description} />
        </View>
      </ThemKeyboardAwareScrollView>
      {/* 
      <View className="absolute bottom-2 left-0 right-0 mx-6 my-4">
        <GenerateButton description={description} />
      </View> */}
    </View>
  );
}
