import { TabButton } from '@/components/TabButton';
import useThemeColors from '@/contexts/ThemeColors';
import { shadowPresets } from '@/utils/useShadow';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
  const colors = useThemeColors();

  return (
    <Tabs>
      <TabSlot />
      <TabList
        className="pb-2"
        style={{
          alignItems: 'center',
          backgroundColor: colors.secondary,

          ...shadowPresets.large,
        }}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton labelAnimated={true} icon="House">
            Home
          </TabButton>
        </TabTrigger>

        <TabTrigger name="style" href="/style" asChild>
          <TabButton labelAnimated={true} icon="Images">
            My Style
          </TabButton>
        </TabTrigger>

        <TabTrigger name="camera" href="/camera" asChild>
          <TabButton labelAnimated={true} icon="Camera">
            Camera
          </TabButton>
        </TabTrigger>

        <TabTrigger name="profile" href="/profile" asChild>
          <TabButton labelAnimated={true} icon="UserRoundPen">
            Profile
          </TabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
