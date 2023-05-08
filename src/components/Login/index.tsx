import { useForm } from "react-hook-form";
import { StyleSheet, Text, Dimensions, TextInput, View } from "react-native";
import { gray, theme } from "../../theme/colors";
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
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { LoginContainer } from "./LoginContainer";
import { InputPassword } from "../shared/form/InputPassword";
import { Divider } from "../shared/Divider";
import { GoogleConnectionButton } from "./GoogleConnectionButton";
import { ConnexionButton } from "../shared/ConnexionButton";
import { LoadingPage } from "../shared/LoadingPage";

interface LoginProps {}

export function Login(props: LoginProps) {
  const {} = props;

  const form = useForm<TCredentials>({
    defaultValues: { login: "", password: "" },
  });

  const [isLoadingOAuth, setIsLoadingOAuth] = useState(false);

  const doLogin = useLogin();
  const setToken = useSetAtom(tokenAtom);

  const { navigate } = useNavigation();

  const inputRef2 = useRef<TextInput>(null);

  async function onSubmit(values: TCredentials) {
    const login = values.login.trim();
    const password = values.password.trim();

    const data = await doLogin({
      login,
      password,
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
      setLoginLocalStorage(login);
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

  if (isLoadingOAuth) return <LoadingPage label="Connexion en cours" />;

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
        <InputPassword
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
          Connexion
        </Button>
        <Divider
          style={{ backgroundColor: gray[300], marginVertical: 40 }}
          label="OU"
        />
        <View style={styles.createAccountContainer}>
          <GoogleConnectionButton
            onSubmitingBegin={() => setIsLoadingOAuth(true)}
            onSubmitingEnd={() => setIsLoadingOAuth(false)}
          />
          <ConnexionButton
            icon={require("./email.png")}
            label="Continuer avec un mail"
            onPress={() => navigate("createAccount")}
            style={{ marginTop: 10 }}
          />
        </View>
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
  createAccountContainer: {
    margin: 5,
  },
});
