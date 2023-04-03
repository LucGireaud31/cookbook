import { View, StyleSheet, Text } from "react-native";
import { EmptyStartIcon, FilledStarIcon } from "../icons/icons";
import { IconButton } from "./IconButton";

interface StarInputProps {
  note: number;
  onChange?(newNote: number): void;
  isDisabled?: boolean;
  size?: number;
}

export function StarInput(props: StarInputProps) {
  const { note, isDisabled, size = 25 } = props;

  function onChange(newNote: number) {
    if (newNote != note) props.onChange?.(newNote);
  }
  return (
    <View style={styles.container}>
      {Array.from({ length: note }).map((_, i) =>
        isDisabled ? (
          <FilledStarIcon key={i} size={size} />
        ) : (
          <IconButton
            key={i}
            icon={<FilledStarIcon size={size} />}
            onPress={() => onChange(i + 1)}
          />
        )
      )}
      {Array.from({ length: 5 - note }).map((_, i) =>
        isDisabled ? (
          <EmptyStartIcon key={i} size={size} />
        ) : (
          <IconButton
            key={i}
            icon={<EmptyStartIcon size={size} />}
            onPress={() => onChange(i + 1 + note)}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
