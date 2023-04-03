import {
  View,
  StyleSheet,
  Text,
  Image,
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native";
import { gray, theme } from "../../theme/colors";

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

export function Divider(props: DividerProps) {
  const { style } = props;

  return <View style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
    backgroundColor: gray[200],
  },
});
