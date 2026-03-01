import useThemeColors from '@/contexts/ThemeColors';
import ThemeProvider from '@/contexts/ThemeContext';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colors = useThemeColors();

  return (
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
  );
}
