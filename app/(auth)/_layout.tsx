import { useAuth } from '@clerk/clerk-expo'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const segments = useSegments()
  const [checked, setChecked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isLoaded || !mounted) return

    if (isSignedIn) {
      // Avoid redirect loop: only redirect if not already on home
      // if (segments[0] !== '(protected)') {
      //   router.replace('/(protected)/(tabs)/home')
      // }
      if (segments[0] !== '(protected)') {
        router.replace('/(protected)/setup')
      }
    }

    setChecked(true)
  }, [isLoaded, isSignedIn, router, segments, mounted])

  if (!checked) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  // Render auth stack if not signed in
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 hides "Sign in"
      }}
    />
  )
}
