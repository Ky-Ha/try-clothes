import useThemeColors from '@/contexts/ThemeColors';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import ActionSheet, { ActionSheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ActionSheetThemedProps extends ActionSheetProps {}

const ActionSheetThemed = forwardRef<ActionSheetRef, ActionSheetThemedProps>(
  ({ containerStyle, children, ...props }, ref) => {
    const colors = useThemeColors();
    const insets = useSafeAreaInsets();

    return (
      <View className="absolute inset-0">
        <ActionSheet
          ref={ref}
          gestureEnabled
          closeOnTouchBackdrop={false}
          {...props}
          containerStyle={[
            {
              backgroundColor: colors.secondary,
              paddingTop: 6,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: insets.bottom,
            },
            containerStyle,
          ]}>
          {children}
        </ActionSheet>
      </View>
    );
  }
);

export default ActionSheetThemed;
