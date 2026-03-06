import React, { forwardRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import type { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import ThemedText from '@/components/ThemedText';

interface Props {
  onSignInPress: () => void;
}

const AuthPromptSheet = forwardRef<ActionSheetRef, Props>(({ onSignInPress }, ref) => {
  return (
    <ActionSheetThemed ref={ref} gestureEnabled={false} closeOnTouchBackdrop={true}>
      <View className="px-6 pb-8 pt-6">
        <ThemedText className="text-center text-2xl font-bold leading-tight">
          Please sign in to continue and get your tattoo created!
        </ThemedText>
        <ThemedText className="mt-6 text-center text-base">
          By signing in, we can keep track of your free tattoo generations.
        </ThemedText>
        <TouchableOpacity
          onPress={onSignInPress}
          activeOpacity={0.9}
          className="mt-10 rounded-full bg-[#FFEB3B] py-4">
          <ThemedText className="text-center text-lg font-semibold ">Sign in</ThemedText>
        </TouchableOpacity>
      </View>
    </ActionSheetThemed>
  );
});

export default AuthPromptSheet;
