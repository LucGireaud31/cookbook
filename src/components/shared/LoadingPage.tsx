import { View, StyleSheet, Text } from "react-native";
import { theme } from "../../theme/colors";
import { Spinner } from "./Spinner";

interface LoadingPageProps {
  label: string;
  size?: number;
}

export function LoadingPage(props: LoadingPageProps) {
  const { label, size = 80 } = props;

  return (
    <View style={styles.container}>
      <View>
        <Spinner icon={false} size={size} />
        <Text
          style={{
            color: theme[400],
            marginTop: 20,
            fontSize: 20,
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
});
