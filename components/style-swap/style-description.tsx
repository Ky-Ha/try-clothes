import useThemeColors from '@/contexts/ThemeColors';
import { TextInput } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export function StyleDescription({ value, onChange }: Props) {
  const colors = useThemeColors();

  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Describe Your Style Request (Optional)"
      placeholderTextColor={colors.placeholder}
      multiline
      className="mt-2 min-h-[64px] rounded-xl border border-gray-300 p-3"
      style={{ color: colors.text }}
    />
  );
}
