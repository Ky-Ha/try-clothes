import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { ActionSheetRef } from 'react-native-actions-sheet';
import AuthPromptSheet from './auth-prompt-sheet';
import AuthMethodsSheet from './auth-method-sheet';
import { router } from 'expo-router';

export interface AuthSheetsHandle {
  showPrompt: () => void;
  hideAll: () => void;
}

const AuthActionSheets = forwardRef<AuthSheetsHandle>((_, ref) => {
  const promptSheetRef = useRef<ActionSheetRef>(null);
  const methodsSheetRef = useRef<ActionSheetRef>(null);

  useImperativeHandle(ref, () => ({
    showPrompt: () => promptSheetRef.current?.show(),
    hideAll: () => {
      promptSheetRef.current?.hide();
      methodsSheetRef.current?.hide();
    },
  }));

  const transitionToMethods = () => {
    promptSheetRef.current?.hide();
    methodsSheetRef.current?.show();
  };

  return (
    <>
      <AuthPromptSheet ref={promptSheetRef} onSignInPress={transitionToMethods} />
      <AuthMethodsSheet ref={methodsSheetRef} redirect={'/(tabs)/camera'} />
    </>
  );
});

export default AuthActionSheets;
