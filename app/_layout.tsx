import useThemeColors from '@/contexts/ThemeColors';
import ThemeProvider from '@/contexts/ThemeContext';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const colors = useThemeColors();

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView
              edges={['top']}
              style={{
                flex: 1,
                backgroundColor: colors.bg,
              }}>
              <StatusBar style={colors.isDark ? 'light' : 'dark'} />

              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.bg },
                }}
              />

              <PortalHost />
            </SafeAreaView>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
