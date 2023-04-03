import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import { InputFormProps, useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { StarInput } from "../StarInput";

interface NoteInputProps extends InputFormProps {}

export function NoteInput(props: NoteInputProps) {
  const { name = "", isRequired, ...rest } = props;

  const error = useFieldError(name);

  const { field } = useController({
    rules: {
      required: isRequired,
    },
    name,
  });

  return (
    <FieldContainer error={error} isRequired={isRequired} {...rest}>
      <StarInput note={field.value} onChange={field.onChange} />
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
