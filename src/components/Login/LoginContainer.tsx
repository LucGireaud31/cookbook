import { ReactNode } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import { theme } from "../../theme/colors";
import { ArrowLeftIcon } from "../icons/icons";
import { IconButton } from "../shared/IconButton";

interface LoginContainerProps {
  children?: ReactNode;
  canGoBack?: boolean;
  title?: string;
}

export function LoginContainer(props: LoginContainerProps) {
  const { children, canGoBack = true, title = "Mon livre de recettes" } = props;

  const { goBack } = useNavigation();

  return (
    <>
      {canGoBack && (
        <IconButton
          style={styles.button}
          icon={<ArrowLeftIcon />}
          onPress={goBack}
        />
      )}
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("../../../assets/icon.png")}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.body}>{children}</View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "15%",
  },
  button: {
    position: "absolute",
    zIndex: 1,
    top: 15,
    left: 15,
  },
  header: { alignItems: "center", marginTop: 40 },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "600",
    color: theme[400],
    textAlign: "center",
  },
  body: {
    marginTop: 50,
    alignItems: "center",
    width: "100%",
  },
});
