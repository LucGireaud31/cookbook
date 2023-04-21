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

const regexNumber = new RegExp(/^[0-9]\d*(\.\d+)?$/);

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
    ...rest
  } = props;

  const error = useFieldError(name);

  const { field } = useController({
    rules: {
      ...rules,
      required: isRequired,
      ...(type == "numeric" && {
        validate: (value) => regexNumber.test(value.toString()),
      }),
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
      rules={{
        ...rules,
        ...(type == "numeric" && { customMessage: "Le nombre est invalide" }),
      }}
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
              } else if (!regexNumber.test(text.toString())) {
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
      </View>
    </FieldContainer>
  );
}
