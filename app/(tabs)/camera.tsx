import ThemKeyboardAwareScrollView from '@/components/ThemKeyboardAwareScrollView';
import ThemedText from '@/components/ThemedText';
import BodyPhotoPicker from '@/components/style-swap/body-photo';
import GenerateButton from '@/components/style-swap/generate';
import ItemPhotoPicker from '@/components/style-swap/item-photo';
import { StyleDescription } from '@/components/style-swap/style-description';
import { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import type { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetThemed from '@/components/ActionSheetThemed';

export default function StyleSwapScreen() {
  const [mustToAuth, setMustToAuth] = useState<boolean>(true);
  const [description, setDescription] = useState('');

  // ── Bottom sheet refs ─────────────────────────────────────
  const promptSheetRef = useRef<ActionSheetRef>(null);
  const methodsSheetRef = useRef<ActionSheetRef>(null);

  // 🔥 SINGLE SOURCE OF TRUTH
  useEffect(() => {
    if (mustToAuth) {
      promptSheetRef.current?.show();
    } else {
      promptSheetRef.current?.hide();
      methodsSheetRef.current?.hide();
    }
  }, [mustToAuth]);

  // ── Switch from sheet 1 → sheet 2 when user taps "Sign in" ──
  const handleSignInPress = () => {
    setTimeout(() => {
      methodsSheetRef.current?.show();
    }, 300);
  };

  return (
    <View className="relative flex-1">
      <ThemKeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={120}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        className="flex-1 px-6 pt-4">
        {/* Header Section */}
        <View className="mb-6 flex-row items-center justify-between">
          <ThemedText className="text-2xl font-bold">StyleSwap</ThemedText>
        </View>

        <View className="w-full">
          <ThemedText className="text-base font-semibold">Body Photo</ThemedText>
          <ThemedText className="mb-3 text-gray-500">
            Upload a photo of yourself for the try-on
          </ThemedText>
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

        {/* Button Section - NOW TRIGGERS SIGN-IN FLOW */}
        <View className="mx-6 my-4">
          <GenerateButton description={description} />
        </View>
      </ThemKeyboardAwareScrollView>

      {/* ==================== BOTTOM SHEET 1 (Sign-in prompt) ==================== */}
      {/* Cannot scroll / drag down */}
      <ActionSheetThemed ref={promptSheetRef} gestureEnabled={false} closeOnTouchBackdrop={false}>
        <View className="px-6 pb-8 pt-6">
          <ThemedText className="text-center text-2xl font-bold leading-tight">
            Please sign in to continue and get your tattoo created!
          </ThemedText>

          <ThemedText className="mt-6 text-center text-base">
            By signing in, we can keep track of your free tattoo generations and ensure your account
            is set up properly.
          </ThemedText>

          <TouchableOpacity
            onPress={handleSignInPress}
            activeOpacity={0.9}
            className="mt-10 rounded-full bg-[#FFEB3B] py-4">
            <ThemedText className="text-center text-lg font-semibold ">Sign in</ThemedText>
          </TouchableOpacity>
        </View>
      </ActionSheetThemed>

      {/* ==================== BOTTOM SHEET 2 (Sign-in methods – overwrote "Welcome back!" to "Sign in") ==================== */}
      {/* Can scroll / drag down – only shown after tapping "Sign in" on sheet 1 */}
      <ActionSheetThemed ref={methodsSheetRef} gestureEnabled={true} closeOnTouchBackdrop={true}>
        <View className="px-6 pb-12 pt-10">
          <ThemedText className="text-4xl font-bold ">Welcome back!</ThemedText>

          <ThemedText className="mt-3 text-base">
            Please choose your preferred sign in method
          </ThemedText>

          <ThemedText className="mt-1 text-sm">
            Your designs stay with you, not with us.
          </ThemedText>

          {/* Google */}
          <TouchableOpacity
            className="mt-10 flex-row items-center justify-center rounded-3xl bg-slate-200 py-5"
            activeOpacity={0.9}>
            <Image
              source={require('@/assets/images/google-color.png')}
              style={{ width: 28, height: 28, marginRight: 12 }}
              resizeMode="contain"
            />

            <ThemedText className="text-lg font-semibold ">Continue with Google</ThemedText>
          </TouchableOpacity>
        </View>
      </ActionSheetThemed>
    </View>
  );
}
