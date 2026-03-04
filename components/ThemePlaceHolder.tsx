import React from 'react';
import { Text, TextProps } from 'react-native';

interface ThemedPlaceSecondaryProps extends TextProps {
  className?: string;
  children: React.ReactNode;
}

export default function ThemedPlaceSecondary({
  className = '',
  children,
  ...props
}: ThemedPlaceSecondaryProps) {
  return (
    <Text className={`text-secondary ${className}`} {...props}>
      {children}
    </Text>
  );
}
