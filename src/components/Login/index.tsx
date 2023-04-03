import { useForm } from "react-hook-form";
import { View, StyleSheet, Text, Dimensions, TextInput } from "react-native";
import { theme } from "../../theme/colors";
import { Button } from "../shared/Button";
import { Form } from "../shared/Form";
import Toast from "react-native-toast-message";
import { useLogin } from "../../services/credentials";
import {
  getLoginLocalStorage,
  setLoginLocalStorage,
  setTokenLocalStorage,
} from "../../services/asyncStorage";
import { TCredentials } from "../../types/credentials";
import { useSetAtom } from "jotai";
import { tokenAtom } from "../../Navigator";
import { Input } from "../shared/form/Input";
import { useEffect, useRef } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { LoginContainer } from "./LoginContainer";

interface LoginProps {}

export function Login(props: LoginProps) {
  const {} = props;

  const form = useForm<TCredentials>({
    defaultValues: { login: "", password: "" },
  });

  const login = useLogin();
  const setToken = useSetAtom(tokenAtom);

  const { navigate } = useNavigation();

  const inputRef2 = useRef<TextInput>(null);

  async function onSubmit(values: TCredentials) {
    const data = await login({
      login: values.login,
      password: values.password.toString(),
    });

    const token = data?.data;

    if (data.error) {
      form.setValue("password", "");

      Toast.show({
        type: "error",
        text1: data.error,
        text2: "Veuillez réessayer",
        visibilityTime: 4000,
      });
    } else if (token) {
      setTokenLocalStorage(token);
      setLoginLocalStorage(values.login);
      setToken(token);
    } else {
      Toast.show({
        type: "error",
        text1: "Erreur inconnue",
        visibilityTime: 4000,
      });
    }
  }

  useEffect(() => {
    (async () => {
      form.setValue("login", (await getLoginLocalStorage()) ?? "");
    })();
  }, []);

  return (
    <Form form={form}>
      <LoginContainer canGoBack={false}>
        <Input
          label="Nom d'utilisateur"
          isRequired
          {...form.register("login")}
          onSubmitEditing={() => inputRef2.current?.focus()}
          returnKeyType="next"
          style={styles.input}
        />
        <Input
          inputRef={inputRef2}
          label="Mot de passe"
          isRequired
          autoCapitalize="none"
          secureTextEntry={true}
          style={styles.input}
          {...form.register("password")}
          onSubmitEditing={form.handleSubmit(onSubmit)}
        />
        <Text
          style={styles.forgotPassword}
          onPress={() => navigate("forgotPassword")}
        >
          Mot de passe oublié ?
        </Text>
        <Button
          isSubmiting={form.formState.isSubmitting}
          style={styles.button}
          onPress={form.handleSubmit(onSubmit)}
        >
          Valider
        </Button>
        <Text
          style={styles.createAccount}
          onPress={() => navigate("createAccount")}
        >
          Créer un compte gratuitement
        </Text>
      </LoginContainer>
    </Form>
  );
}

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get("screen").width * 0.7,
  },
  label: { fontWeight: "600" },
  button: { marginTop: 30, width: "100%" },
  createAccount: {
    alignSelf: "flex-start",
    marginTop: 20,
    color: theme[400],
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
  },
});
