import { useController } from "react-hook-form";
import { Touchable } from "react-native";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputFormProps, useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";

interface ColorPickerProps extends InputFormProps {}

const COLORS = [
  "#d73964",
  "#d23440",
  "#db643a",
  "#e88334",
  "#e2a71e",
  "#e25241",
  "#d0da59",
  "#4053ae",
  "#70b949",
  "#73564a",
  "#67ab5a",
  "#8f36aa",
  "#f6c244",
  "#52b9d0",
  "#4595ec",
  "#009688",
  "#5abeA7",
  "#59bccd",
  "#4a97e4",
  "#2d68cd",
  "#9946c7",
  "#d9639e",
  "#6d6f74",
  "#939287",
];

export function ColorPicker(props: ColorPickerProps) {
  const { label, name = "", isRequired } = props;

  const { field } = useController({
    name,
    rules: {
      required: isRequired,
    },
  });

  const error = useFieldError(name);

  return (
    <FieldContainer label={label} isRequired={isRequired} error={error}>
      <FlatList
        numColumns={4}
        data={COLORS}
        style={[error && styles.listError]}
        renderItem={({ item: color }) => (
          <View style={styles.colorContainer}>
            <Pressable
              onPress={() => {
                field.onChange(color);
              }}
              style={[
                styles.color,
                { backgroundColor: color },
                field.value == color && styles.colorSelected,
              ]}
            />
          </View>
        )}
      />
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  listError: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 20,
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
  },
  colorSelected: {
    borderColor: "black",
    borderWidth: 4,
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
