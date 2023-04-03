import { TouchableOpacity, View, StyleSheet } from "react-native";
import { theme } from "../../theme/colors";
import { SVGCirclePlus } from "../icons/icons";

export function DividerAddButton({ onPress }: { onPress(): void }) {
  return (
    <TouchableOpacity style={styles.dividerContainer} onPress={onPress}>
      <View style={styles.dividerButton}>
        <SVGCirclePlus size={50} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    backgroundColor: theme[400],
    marginVertical: 20,
    height: 2,
    position: "relative",
  },
  dividerButton: {
    position: "absolute",
    top: -24,
    left: "50%",
    transform: [{ translateX: -24 }],
  },
});
