import { StyleSheet, TextInput } from "react-native";
import { gray, theme } from "../../../theme/colors";
import { InputProps } from "./Input";

interface DumpbTextInput extends InputProps {
  isError?: boolean;
}

export function DumpbTextInput(props: DumpbTextInput) {
  const {
    inputRef,
    type,
    style,
    isError,
    onChangeText,
    value,
    placeholder,
    ...rest
  } = props;

  return (
    <TextInput
      ref={inputRef}
      keyboardType={type}
      style={{
        ...styles.input,
        ...(rest.numberOfLines && {
          height: (styles.input.fontSize + 6) * rest.numberOfLines,
        }),
        ...(style as any),
        ...(isError && {
          borderWidth: 2,
          borderColor: "red",
        }),
      }}
      {...rest}
      {...(rest.numberOfLines && {
        multiline: true,
      })}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={gray[400]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: theme[400],
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
