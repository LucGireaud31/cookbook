import { ReactNode } from "react";
import { Text } from "react-native";
import { theme } from "../../theme/colors";

interface HighlightProps {
  children: ReactNode;
  color?: string | true;
  size?: number;
}

export function Highlight(props: HighlightProps) {
  const { children, color, size } = props;

  return (
    <Text
      style={{
        fontWeight: "bold",

        fontSize: size,
        ...(color != undefined && {
          ...(color == true
            ? {
                color: theme[400],
              }
            : {
                color,
              }),
        }),
      }}
    >
      {children}
    </Text>
  );
}
