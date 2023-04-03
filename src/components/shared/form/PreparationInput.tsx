import { useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { gray, theme } from "../../../theme/colors";
import { SVGCirclePlus, XIcon } from "../../icons/icons";
import { DividerAddButton } from "../DividerAddButton";
import { useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { IconButton } from "../IconButton";
import { Input } from "./Input";

interface PreprationInputProps {
  name?: string;
  isRequired?: boolean;
  label?: string;
}

export function PreprationInput(props: PreprationInputProps) {
  const { label, isRequired, name = "" } = props;

  const error = useFieldError(name);

  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    rules: {
      required: isRequired,
    },
    name,
  });

  function Step(props: { index: number }) {
    const { index } = props;

    return (
      <View style={styles.stepContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.stepLabel}>Étape {index}:</Text>
          {index != 1 && (
            <IconButton icon={<XIcon />} onPress={() => remove(index - 1)} />
          )}
        </View>
        <Input
          placeholder={`Étape ${index}...`}
          multiline={true}
          style={styles.inputStyle}
          numberOfLines={8}
          {...register(`${name}.${index - 1}`)}
        />
      </View>
    );
  }

  return (
    <FieldContainer label={label} error={error} isRequired={isRequired}>
      {fields.map((field, i) => (
        <Step key={field.id} index={i + 1} />
      ))}
      <DividerAddButton onPress={() => append("")} />
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 150,
    paddingVertical: 5,
    textAlignVertical: "top",
    fontSize: 13,
  },
  stepContainer: { marginVertical: 5, flex: 1 },
  labelContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 25,
  },
  stepLabel: { color: gray[400], fontWeight: "600", fontSize: 12 },
});
