import { StyleSheet, TextInput, View } from "react-native";
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
    rightAddon,
    ...rest
  } = props;

  return (
    <View>
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
          ...(rightAddon && { paddingRight: 40 }),
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
      {rightAddon && (
        <View
          style={{
            position: "absolute",
            height: 36,
            width: 36,
            top: 2,
            right: 2,
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "white",
          }}
        >
          {rightAddon}
        </View>
      )}
    </View>
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
