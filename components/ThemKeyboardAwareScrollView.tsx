import React from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { ScrollView, ScrollViewProps, View } from 'react-native';

interface ThemKeyboardAwareScrollViewProps extends KeyboardAwareScrollViewProps {
  className?: string;
  children: React.ReactNode;
}

export default function ThemKeyboardAwareScrollView({
  className = '',
  children,
  contentContainerStyle,
  ...props
}: KeyboardAwareScrollViewProps) {
  return (
    <KeyboardAwareScrollView
      className={`bg-background px-global ${className}`}
      bounces={false}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
}
