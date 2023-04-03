import { capitalize } from "lodash";
import { View, StyleSheet, Text } from "react-native";
import { gray } from "../../theme/colors";

interface TagProps {
  name: string;
  color: string;
}

export function Tag(props: TagProps) {
  const { color: colorProps, name } = props;

  const color = colorProps == "" ? "#000" : colorProps;

  return (
    <View style={{ ...styles.tagContainer, borderColor: color }}>
      <View style={{ ...styles.dot, backgroundColor: color }} />
      <Text style={{ ...styles.tagLabel, color: color }}>
        {capitalize(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: gray[100],
    paddingHorizontal: 8,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    opacity: 0.6,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tagLabel: {
    marginLeft: 5,
    fontWeight: "700",
  },
});
