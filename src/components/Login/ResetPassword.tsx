import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "../../hooks/useNavigation";
import { useResetPassword } from "../../services/credentials";
import { StackComponent } from "../../types/reactNavigation";
import { TResetPassword } from "../../types/type";
import { Button } from "../shared/Button";
import { Form } from "../shared/Form";
import { Input } from "../shared/form/Input";
import { LoginContainer } from "./LoginContainer";

interface ResetPasswordProps extends StackComponent {}

export function ResetPassword(props: ResetPasswordProps) {
  const { route } = props;

  const userId = route?.params.token;

  const resetPassword = useResetPassword();
  const { goBack } = useNavigation();

  const form = useForm<TResetPassword>({
    defaultValues: {
      userId,
      password: "",
      password2: "",
    },
  });

  function onSubmit(values: TResetPassword) {
    resetPassword(values.password, values.userId);
    goBack();
  }

  const inputRef2 = useRef<TextInput>(null);

  return (
    <LoginContainer title="Réinitialiser mon mot de passe">
      <Form form={form}>
        <View>
          <Input
            label="Entrer un mot de passe"
            isRequired
            rules={{ minLength: 6 }}
            autoCapitalize="none"
            {...form.register("password")}
            secureTextEntry={true}
            onSubmitEditing={() => inputRef2.current?.focus()}
          />
          <Input
            inputRef={inputRef2}
            label="Resaisir le mot de passe"
            isRequired
            rules={{
              validate: (value) => form.watch("password") == value,
              customMessage: "Le mot de passes est différent",
            }}
            {...form.register("password2")}
            autoCapitalize="none"
            secureTextEntry={true}
            onSubmitEditing={form.handleSubmit(onSubmit)}
          />
          <Button style={styles.button} onPress={form.handleSubmit(onSubmit)}>
            Réinitialiser mon mot de passe
          </Button>
        </View>
      </Form>
    </LoginContainer>
  );
}

const styles = StyleSheet.create({
  button: { width: "100%", marginTop: 15 },
});
