import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { InputFormProps, useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { TextToSelect } from "../TextToSelect";

interface YesNoInputProps extends InputFormProps {}

export function YesNoInput(props: YesNoInputProps) {
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
      <View style={styles.container}>
        <TextToSelect
          label="Oui"
          isSelected={field.value}
          onPress={() => field.onChange(true)}
        />
        <TextToSelect
          label="Non"
          isSelected={!field.value}
          onPress={() => field.onChange(false)}
        />
      </View>
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
});
