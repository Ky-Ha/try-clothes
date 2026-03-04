import { generateResult } from '@/api/logic/generate-result';
import { useBodyStore } from '@/store/body';
import { useItemStore } from '@/store/item';
import { useResultStore } from '@/store/result';
import { useMutation } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import ThemedText from '../ThemedText';

type GenerateButtonProps = {
  description: string;
};

export default function GenerateButton({ description }: GenerateButtonProps) {
  const bodyImages = useBodyStore((s) => s.images);
  const itemImages = useItemStore((s) => s.images);

  const setResultImage = useResultStore((s) => s.setResultImage);
  const setItemImages = useResultStore((s) => s.setItemImages);

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      bodyImages,
      itemImages,
      description,
    }: {
      bodyImages: string[];
      itemImages: string[];
      description: string;
    }) => generateResult(bodyImages, itemImages, description),

    onSuccess: (image) => {
      setItemImages(itemImages);

      // ✅ fake result for now
      // setResultImage(require('@/assets/images/fake-result.png'))
      setResultImage(image);

      router.push('/screens/result');
    },

    onError: (error: any) => {
      console.error(error);
      Alert.alert('Error', 'Failed to generate style swap');
    },
  });

  const handleGenerate = () => {
    if (isPending) return;

    mutate({
      bodyImages,
      itemImages,
      description,
    });
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={handleGenerate}
        disabled={isPending}
        activeOpacity={0.85}
        className="overflow-hidden rounded-2xl">
        <LinearGradient
          colors={isPending ? ['#D1D1D6', '#D1D1D6'] : ['#F8C3D0', '#C9B6FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="items-center py-4">
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <ThemedText className="text-base font-semibold">Generate StyleSwap</ThemedText>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
