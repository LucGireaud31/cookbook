import { ReactNode } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  ButtonProps as NativeButtonProps,
} from "react-native";
import { theme } from "../../theme/colors";
import { Spinner } from "./Spinner";

interface ButtonProps extends Omit<NativeButtonProps, "title"> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?(): void;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  fontSize?: number;
  color?: string;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
  isDisabled?: boolean;
  isSubmiting?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    children,
    style,
    onPress,
    rightIcon,
    leftIcon,
    fontSize = 14,
    fontWeight = "600",
    isDisabled = false,
    isSubmiting = false,
    color = "white",
    ...rest
  } = props;

  const disabled = isDisabled || isSubmiting;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme[400],
      height: 40,
      minWidth: 100,
      justifyContent: "center",
      borderRadius: 10,
      paddingHorizontal: 15,
      position: "relative",
      ...(disabled && { opacity: 0.5 }),
      ...(style as any),
    },
    label: {
      color,
      textAlign: "center",
      fontSize,
      fontWeight,
    },
    rightIcon: {
      position: "absolute",
      zIndex: 999,
      right: 10,
    },
    leftIcon: {
      position: "absolute",
      zIndex: 999,
      left: 10,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {isSubmiting ? (
        <Spinner size={30} style={{ alignSelf: "center" }} />
      ) : (
        <Text style={styles.label}>{children}</Text>
      )}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
}
