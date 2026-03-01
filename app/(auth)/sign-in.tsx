import { useSSO } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'; // Add this import
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  useWarmUpBrowser() // Uncomment this

  const { startSSOFlow } = useSSO()
  const router = useRouter() // Add this

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',
          redirectUrl: AuthSession.makeRedirectUri({ path: 'sign-in' }), // Explicitly set to return to this page
        })

      if (createdSessionId) {
        await setActive!({
          session: createdSessionId,
          navigate: async () => {
            router.replace('/(protected)')
          },
        })
      } else {
        // Handle incomplete sign-up (e.g., required username)
        console.log('Incomplete flow - missing requirements')
        if (signUp) {
          // Example: Prompt user for additional info if needed
          // await signUp.update({ username: 'some-username' })
          // Then retry setActive
        } else if (signIn) {
          // Handle sign-in specifics if applicable
        }
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View className="flex-1 bg-white px-6">
      {/* CENTER CONTENT */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/data/family.png')}
          className="w-full h-64"
          resizeMode="contain"
        />

        <Text className="mt-6 text-2xl font-bold text-center text-black">
          Welcome to Workspace Space
        </Text>

        <Text className="mt-2 text-sm text-center text-gray-500 max-w-xs">
          Organize your family tasks, finances and everything else together.
        </Text>
      </View>

      {/* BOTTOM BUTTON */}
      <View className="pb-16">
        <LinearGradient
          colors={['#03ff18', '#001702']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 999,
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            className="w-full rounded-full py-4 items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-lg">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}
