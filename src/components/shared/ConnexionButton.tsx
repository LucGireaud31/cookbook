import { ViewStyle } from "@expo/html-elements/build/primitives/View";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StyleProp,
  ImageSourcePropType,
} from "react-native";
import { gray } from "../../theme/colors";

interface ConnexionButtonProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  onPress?(): void;
}

export function ConnexionButton(props: ConnexionButtonProps) {
  const { label, style, icon, onPress } = props;

  return (
    <TouchableOpacity
      style={[styles.container, style as any]}
      onPress={onPress}
    >
      <Image source={icon} style={styles.image} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    borderColor: gray[300],
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 10,
  },
  image: {
    position: "absolute",
    left: 7.5,
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  label: {
    textAlign: "center",
    marginLeft: 10,
    width: "100%",
    fontWeight: "600",
  },
});
