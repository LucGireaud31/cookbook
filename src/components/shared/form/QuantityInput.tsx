import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { Input } from "./Input";
import { ToggleInput } from "./ToggleInput";

interface QuantityInputProps {
  name: string;
  isRequired?: boolean;
  label?: string;
  item1: {
    label: string;
    value: string;
  };
  item2: {
    label: string;
    value: string;
  };
}

export function QuantityInput(props: QuantityInputProps) {
  const { label, isRequired, name, item1, item2 } = props;

  const error = useFieldError(name);

  const { field } = useController({
    rules: {
      required: isRequired,
    },
    name,
  });

  return (
    <FieldContainer label={label} error={error} isRequired={isRequired}>
      <View style={styles.container}>
        <Input
          type="numeric"
          isRequired
          style={styles.inputStyle}
          name={`${name}.value`}
        />
        <ToggleInput item1={item1} item2={item2} name={`${name}.type`} />
      </View>
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: -5,
    marginBottom: 5,
    fontSize: 14,
    flexDirection: "row",
    width: "100%",
  },

  inputStyle: {
    textAlign: "center",
    width: 80,
    marginRight: 20,
    fontWeight: "700",
  },
});
