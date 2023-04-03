import { useForm } from "react-hook-form";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import { useForgotPassword } from "../../services/credentials";
import { Button } from "../shared/Button";
import { Form } from "../shared/Form";
import { Input } from "../shared/form/Input";
import { LoginContainer } from "./LoginContainer";

interface ForgotPasswordProps {}

export function ForgotPassword(props: ForgotPasswordProps) {
  const {} = props;

  const form = useForm<{ mail: string }>({ defaultValues: { mail: "" } });

  const forgotPassword = useForgotPassword();

  const { goBack } = useNavigation();

  function onSubmit({ mail }: { mail: string }) {
    forgotPassword(mail);
    goBack();
  }

  return (
    <Form form={form}>
      <LoginContainer>
        <Input
          style={styles.input}
          label="Email"
          isRequired
          autoCapitalize="none"
          inputMode="email"
          onSubmitEditing={form.handleSubmit(onSubmit)}
          {...form.register("mail")}
        />
        <Button style={styles.button} onPress={form.handleSubmit(onSubmit)}>
          Réinitialiser mon mot de passe
        </Button>
      </LoginContainer>
    </Form>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: "center" },
  input: {
    width: Dimensions.get("screen").width * 0.7,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
});
