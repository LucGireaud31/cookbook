import { useController } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { theme } from "../../../theme/colors";
import { useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";

interface ToggleProps {
  name?: string;
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

export function ToggleInput(props: ToggleProps) {
  const { label, isRequired, name = "", item1, item2 } = props;

  const error = useFieldError(name);

  const { field } = useController({
    rules: {
      required: isRequired,
    },
    name,
  });

  function onPress(value: string) {
    field.onChange(parseInt(value));
  }

  return (
    <FieldContainer
      label={label}
      error={error}
      isRequired={isRequired}
      style={styles.container}
    >
      <Text
        style={{
          ...styles.baseItem,
          ...styles.itemLeft,
          ...(field.value == item1.value && styles.selectedItem),
        }}
        onPress={() => onPress(item1.value)}
      >
        {item1.label}
      </Text>
      <Text
        style={{
          ...styles.baseItem,
          ...styles.itemRight,
          ...(field.value == item2.value && styles.selectedItem),
        }}
        onPress={() => onPress(item2.value)}
      >
        {item2.label}
      </Text>
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    flexDirection: "row",
  },
  baseItem: {
    backgroundColor: "white",
    color: theme[400],
    width: "50%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    fontWeight: "300",
  },
  itemLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  itemRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: theme[400],
    fontWeight: "800",
  },
});
