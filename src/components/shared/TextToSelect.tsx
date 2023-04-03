import { capitalize } from "lodash";
import { StyleSheet, Text } from "react-native";
import { theme } from "../../theme/colors";

interface TextToSelectProps {
  isSelected: boolean;
  label: string;
  onPress(newSelected: boolean): void;
}

export function TextToSelect(props: TextToSelectProps) {
  const { label, isSelected, onPress } = props;

  return (
    <Text
      onPress={() => onPress(!isSelected)}
      style={{
        ...styles.baseTag,
        ...(isSelected && styles.selectedTag),
      }}
    >
      {capitalize(label)}
    </Text>
  );
}

const styles = StyleSheet.create({
  baseTag: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: theme[400],
    color: theme[400],
    borderRadius: 50,
    padding: 5,
    height: 35,
    textAlign: "center",
    textAlignVertical: "center",
    margin: 4,
    fontSize: 13,
    minWidth: "30%",
    fontWeight: "700",
  },
  selectedTag: {
    backgroundColor: theme[400],
    color: "white",
  },
});
