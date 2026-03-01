import { TextInput } from 'react-native'

type Props = {
  value: string
  onChange: (text: string) => void
}

export function StyleDescription({ value, onChange }: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Describe Your Style Request (Optional)"
      multiline
      className="border border-gray-300 rounded-xl p-3 mt-2 min-h-[64px]"
    />
  )
}
