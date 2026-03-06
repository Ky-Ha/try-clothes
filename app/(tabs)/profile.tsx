import { View, TouchableOpacity, Switch, Image } from 'react-native';
import { useRef, useState } from 'react';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';
import { Separator } from '@/components/ui/separator';
import ThemedLightDarkView from '@/components/ThemeLightDarkView';
import { useClerk, useUser } from '@clerk/clerk-expo';
import AuthMethodsSheet from '@/components/auth/auth-method-sheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { useBodyStore } from '@/store/body';
import { useItemStore } from '@/store/item';
import { useResultStore } from '@/store/result';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [promptEnhancement, setPromptEnhancement] = useState(true);
  const [showEnjoyModal, setShowEnjoyModal] = useState(false);

  const queryClient = useQueryClient(); // Get the query client here
  const [loggingOut, setLoggingOut] = useState(false);

  const methodsSheetRef = useRef<ActionSheetRef>(null);

  const transitionToMethods = () => {
    methodsSheetRef.current?.show();
  };

  const handleLogout = async () => {
    console.log('Logout');
    if (loggingOut) return;
    setLoggingOut(true);

    // Clear Tanstack Query cache (removes all queries; you can filter by keys if needed)
    queryClient.removeQueries();

    // Reset Zustand store
    useBodyStore.getState().clearImages();
    useItemStore.getState().clearImages();
    useResultStore.getState().clearAll();

    // Now sign out and redirect
    await signOut();
    router.replace('/(tabs)/profile');
  };

  return (
    <ThemedScroller className="flex-1 px-6">
      {/* Header */}
      <ThemedText className="mb-4 mt-4 w-full items-center text-2xl font-semibold">
        Profile
      </ThemedText>

      {/* Not signed in card */}
      <ThemedLightDarkView className="mb-6 items-center rounded-3xl p-4">
        <Icon name="CircleUser" size={42} />
        <ThemedText className="mt-3 text-2xl font-semibold ">Not signed in</ThemedText>
        <ThemedText className="mt-1 text-center text-sm text-zinc-400">
          Sign in to access your account details, subscription info, and personalized features
        </ThemedText>
        {user ? (
          <Image source={{ uri: user.imageUrl }} className="mb-3 h-20 w-20 rounded-full" />
        ) : (
          <TouchableOpacity
            className="mt-4 rounded-xl border border-gray-300 px-6 py-3"
            onPress={transitionToMethods}>
            <ThemedText className="font-semibold">Sign in</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedLightDarkView>

      <Section>
        <Row icon="LogOut" label="LogOut" onPress={handleLogout} />
      </Section>

      {/* Quick actions */}
      <Section>
        <RowModel
          label="Enjoying the app?"
          onPress={() => setShowEnjoyModal((state) => !state)}
          showEnjoyModal={showEnjoyModal}
        />
        {showEnjoyModal && (
          <View className="inset-0 z-50 justify-end px-6">
            <Separator />
            {/* sheet */}
            <View className="rounded-t-3xl">
              <View className="mb-4 h-1 w-10 self-center rounded-full" />

              <ThemedText className="mb-2 text-lg font-semibold ">Enjoying the app?</ThemedText>

              <ThemedText className="mb-5 text-sm">
                We'd love to hear from you! If you're enjoying Inkigo, a review on the App Store
                helps other tattoo lovers discover us. You can also reach out anytime with feedback
                or feature ideas.
              </ThemedText>
              <Separator />
              {/* Rate app */}
              <TouchableOpacity className="flex-row items-center py-3">
                <ThemedText className="text-2xl">⭐</ThemedText>
                <ThemedText className="ml-3 font-semibold text-yellow-400">
                  Rate on App Store
                </ThemedText>
              </TouchableOpacity>
              <Separator />
              {/* Feedback */}
              <TouchableOpacity className="ml-2 flex-row items-center py-3">
                <Icon name="Mail" size={20} />
                <ThemedText className="ml-3">Send Feedback</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Section>

      {/* Support & Feedback */}
      <Section title="SUPPORT & FEEDBACK">
        <Row icon="Star" label="Rate App" />
        <Separator />
        <Row icon="Share2" label="Share with Friends" />
        <Separator />
        <Row icon="Mail" label="Contact Support" />
      </Section>

      {/* Follow us */}
      <Section title="FOLLOW US">
        <Row icon="Globe" label="inkigo.ai" />
        <Separator />
        <Row icon="Instagram" label="Instagram" />
        <Separator />
        <Row icon="Music" label="TikTok" />
        <Separator />
        <Row icon="Twitter" label="X" />
      </Section>

      {/* Settings */}
      <Section title="SETTINGS">
        <ToggleRow label="Show Onboarding" value={showOnboarding} onChange={setShowOnboarding} />
        <Separator />
        <ToggleRow
          label="Prompt Enhancement"
          value={promptEnhancement}
          onChange={setPromptEnhancement}
        />
      </Section>

      {/* Legal */}
      <Section title="LEGAL">
        <Row icon="Hand" label="Privacy Policy" />
        <Separator />
        <Row icon="FileText" label="Terms of Service" />
      </Section>

      <AuthMethodsSheet ref={methodsSheetRef} redirect={'/(tabs)/profile'} />
    </ThemedScroller>
  );
}

const Section = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  return (
    <View className="mb-6 ">
      {title && (
        <View className="px-4">
          <ThemedText className="mb-2 text-xs">{title}</ThemedText>
        </View>
      )}
      <ThemedLightDarkView className="rounded-2xl px-4">
        <View className="overflow-hidden rounded-2xl ">{children}</View>
      </ThemedLightDarkView>
    </View>
  );
};

const Row = ({ icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center border-b py-4 last:border-b-0"
      onPress={onPress}>
      <Icon name={icon} size={30} fill={'ok'} />
      <ThemedText className="ml-3 flex-1 ">{label}</ThemedText>
    </TouchableOpacity>
  );
};

const ToggleRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => {
  return (
    <View className="flex-row items-center border-b  px-4 py-4 last:border-b-0">
      <ThemedText className="flex-1 ">{label}</ThemedText>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};

const RowModel = ({
  label,
  onPress,
  showEnjoyModal,
}: {
  label: string;
  showEnjoyModal: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center border-b py-4 last:border-b-0">
      <ThemedText className="text-2xl">🎁</ThemedText>
      <ThemedText className="ml-3 flex-1 ">{label}</ThemedText>
      <Icon name={showEnjoyModal ? 'ChevronDown' : 'ChevronRight'} size={18} />
    </TouchableOpacity>
  );
};
