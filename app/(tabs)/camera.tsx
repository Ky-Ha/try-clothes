import { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import ThemKeyboardAwareScrollView from '@/components/ThemKeyboardAwareScrollView';
import ThemedText from '@/components/ThemedText';
import BodyPhotoPicker from '@/components/style-swap/body-photo';
import GenerateButton from '@/components/style-swap/generate';
import ItemPhotoPicker from '@/components/style-swap/item-photo';
import { StyleDescription } from '@/components/style-swap/style-description';
import AuthActionSheets, { AuthSheetsHandle } from '@/components/auth/auth';

export default function StyleSwapScreen() {
  const { user } = useUser();

  const [description, setDescription] = useState('');
  const authSheetsRef = useRef<AuthSheetsHandle>(null);

  useEffect(() => {
    if (!user) {
      authSheetsRef.current?.showPrompt();
    } else {
      authSheetsRef.current?.hideAll();
    }
  }, [user]);

  return (
    <View className="relative flex-1">
      <ThemKeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={120}
        className="flex-1 px-6 pt-4">
        <View className="mb-6 flex-row items-center justify-between">
          <ThemedText className="text-2xl font-bold">StyleSwap</ThemedText>
        </View>

        <View className="w-full">
          <ThemedText className="text-base font-semibold">Body Photo</ThemedText>
          <ThemedText className="mb-3 text-gray-500">Upload a photo for the try-on</ThemedText>
          <BodyPhotoPicker />

          <ThemedText className="mt-6 text-base font-semibold">Sample Items</ThemedText>
          <ItemPhotoPicker />
        </View>

        <View className="mt-6 w-full">
          <ThemedText className="text-base font-semibold">Style Request (Optional)</ThemedText>
          <StyleDescription value={description} onChange={setDescription} />
        </View>

        <View className="mx-6 my-4">
          <GenerateButton description={description} />
        </View>
      </ThemKeyboardAwareScrollView>

      {/* Separated Auth Component */}
      <AuthActionSheets ref={authSheetsRef} />
    </View>
  );
}
