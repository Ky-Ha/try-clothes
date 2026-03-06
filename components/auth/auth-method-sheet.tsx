import React, { forwardRef, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as AuthSession from 'expo-auth-session';
import type { ActionSheetRef } from 'react-native-actions-sheet';
import * as WebBrowser from 'expo-web-browser';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import ThemedText from '@/components/ThemedText';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const AuthMethodsSheet = forwardRef<ActionSheetRef>((_, ref) => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri({ path: 'sign-in' }), // Explicitly set to return to this page
      });

      if (createdSessionId) {
        await setActive!({
          session: createdSessionId,
          navigate: async () => {
            router.back();
          },
        });
      } else {
        // Handle incomplete sign-up (e.g., required username)
        console.log('Incomplete flow - missing requirements');
        if (signUp) {
          // Example: Prompt user for additional info if needed
          // await signUp.update({ username: 'some-username' })
          // Then retry setActive
        } else if (signIn) {
          // Handle sign-in specifics if applicable
        }
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <ActionSheetThemed ref={ref} gestureEnabled={true} closeOnTouchBackdrop={true}>
      <View className="px-6 pb-12 pt-10">
        <ThemedText className="text-4xl font-bold">Welcome back!</ThemedText>
        <ThemedText className="mt-3 text-base">
          Please choose your preferred sign in method
        </ThemedText>

        <TouchableOpacity
          className="mt-10 flex-row items-center justify-center rounded-3xl bg-slate-200 py-5"
          onPress={onPress}
          activeOpacity={0.9}>
          <Image
            source={require('@/assets/images/google-color.png')}
            style={{ width: 28, height: 28, marginRight: 12 }}
            resizeMode="contain"
          />
          <ThemedText className="text-lg font-semibold">Continue with Google</ThemedText>
        </TouchableOpacity>
      </View>
    </ActionSheetThemed>
  );
});

export default AuthMethodsSheet;
