import { ReactNode, RefObject } from "react";
import {
  FieldValues,
  Merge,
  RegisterOptions,
  useController,
} from "react-hook-form";
import {
  KeyboardTypeOptions,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { InfoIcon, ScanIcon } from "../../icons/icons";
import { useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { DumpbTextInput } from "./DumbTextInput";

export interface InputProps extends TextInputProps {
  name?: string;
  isRequired?: boolean;
  label?: string;
  type?: KeyboardTypeOptions;
  inputRef?: RefObject<TextInput>;
  subTitle?: string;
  rules?: Merge<
    Omit<
      RegisterOptions<FieldValues, string>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled" | "required"
    >,
    { customMessage?: string }
  >;
  info?: string;
  rightAddon?: ReactNode;
}

export function Input(props: InputProps) {
  const {
    label,
    isRequired,
    name = "",
    type,
    inputRef,
    value,
    subTitle,
    rules,
    info,
    rightAddon,
    ...rest
  } = props;

  const error = useFieldError(name);

  const { field } = useController({
    rules: {
      ...rules,
      required: isRequired,
    },
    name,
  });

  const isError = error != null;
  return (
    <FieldContainer
      subTitle={subTitle}
      label={label}
      error={error}
      isRequired={isRequired}
      rules={rules}
      info={info}
    >
      <View>
        <DumpbTextInput
          inputRef={inputRef}
          type={type}
          isError={isError}
          value={value != undefined ? value : field.value?.toString()}
          onChangeText={(text) => {
            if (type == "numeric") {
              const res = parseFloat(text);
              if (isNaN(res)) {
                field.onChange(text);
              } else {
                field.onChange(res);
              }
            } else {
              field.onChange(text);
            }
            rest.onChangeText?.(text);
          }}
          {...rest}
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
    </FieldContainer>
  );
}
