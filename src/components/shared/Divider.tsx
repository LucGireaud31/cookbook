import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  TextStyle,
} from "react-native";
import { background, gray } from "../../theme/colors";

interface DividerProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
  textStyle?: StyleProp<TextStyle>;
}

export function Divider(props: DividerProps) {
  const { style, label, textStyle } = props;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.text, textStyle]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
    backgroundColor: gray[200],
  },
  text: {
    position: "absolute",
    top: -13,
    backgroundColor: background,
    paddingVertical: 2,
    paddingHorizontal: 5,
    color: gray[500],
    left: "44%",
  },
});
