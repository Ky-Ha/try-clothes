import useThemeColors from '@/contexts/ThemeColors';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface ThemedLightDarkViewProps extends ViewProps {
  className?: string;
  variant?: 'bg' | 'secondary' | 'sheet';
}

export default function ThemedLightDarkView({
  className = '',
  variant = 'bg',
  style,
  children,
  ...props
}: ThemedLightDarkViewProps) {
  const colors = useThemeColors();

  return (
    <View {...props} className={className} style={[{ backgroundColor: colors.lightDark }, style]}>
      {children}
    </View>
  );
}
