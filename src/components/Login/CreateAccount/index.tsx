import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";
import { TCreateUserSchema } from "../../../types/credentials";
import { Button } from "../../shared/Button";
import { Form } from "../../shared/Form";
import { Input } from "../../shared/form/Input";
import { InputPassword } from "../../shared/form/InputPassword";
import { LoginContainer } from "../LoginContainer";

interface CreateAccountProps {}

const DEFAULT_FORM: TCreateUserSchema = {
  login: "",
  password: "",
  password2: "",
  mail: "",
  existingHome: "",
};

export function CreateAccount(props: CreateAccountProps) {
  const {} = props;

  const form = useForm<TCreateUserSchema>({ defaultValues: DEFAULT_FORM });

  const { navigate } = useNavigation();

  async function onSubmit({ password2, ...values }: TCreateUserSchema) {
    navigate("shareMyBook", { ...values });
  }

  // Refs
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);

  return (
    <LoginContainer title="Création de mon compte">
      <Form form={form}>
        <Input
          style={styles.input}
          label="Nom d'utilisateur"
          isRequired
          onSubmitEditing={() => input2.current?.focus()}
          {...form.register("login")}
          rules={{
            minLength: 3,
          }}
        />
        <Input
          inputRef={input2}
          style={styles.input}
          label="Email"
          isRequired
          inputMode="email"
          onSubmitEditing={() => input3.current?.focus()}
          autoCapitalize="none"
          {...form.register("mail")}
          rules={{
            minLength: 7,
          }}
          info="Le mail sera seulement utilisé en cas de perte mot de passe. Il ne sera en aucun cas utilisé à des fins commerciaux où pour de la publicité."
        />
        <InputPassword
          inputRef={input3}
          style={styles.input}
          label="Mot de passe"
          isRequired
          autoCapitalize="none"
          onSubmitEditing={() => input4.current?.focus()}
          secureTextEntry={true}
          {...form.register("password")}
          rules={{
            minLength: 6,
          }}
        />
        <InputPassword
          inputRef={input4}
          style={styles.input}
          label="Resaisir le mot de passe"
          isRequired
          autoCapitalize="none"
          onSubmitEditing={form.handleSubmit(onSubmit)}
          secureTextEntry={true}
          {...form.register("password2")}
          rules={{
            validate: (value) => form.watch("password") == value,
            customMessage: "Le mot de passes est différent",
          }}
        />

        <Button style={styles.button} onPress={form.handleSubmit(onSubmit)}>
          Créer mon compte
        </Button>
      </Form>
    </LoginContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    width: Dimensions.get("screen").width * 0.7,
  },
});
