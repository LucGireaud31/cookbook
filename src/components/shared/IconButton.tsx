import { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
  ImageStyle,
  GestureResponderEvent,
} from "react-native";

interface IconButtonProps {
  icon: ReactNode | string;
  onPress?(e: GestureResponderEvent): void;
  style?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
}

export function IconButton(props: IconButtonProps) {
  const { icon, onPress, style, imageStyle, isDisabled = false } = props;

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...(isDisabled && { opacity: 0.5 }),
        ...(style as any),
      }}
      onPress={onPress}
      disabled={isDisabled}
    >
      {typeof icon == "string" ? (
        <Image source={{ uri: icon }} style={imageStyle as any} />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
