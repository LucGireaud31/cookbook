import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { GraphQLError } from "graphql";
import Toast from "react-native-toast-message";
import { ENV } from "../../env";
import { TCreateUser, TCredentials } from "../types/credentials";

const mutationLogin = gql`
  mutation login($login: String!, $password: String!) {
    login(credentials: { login: $login, password: $password })
  }
`;

export function useLogin() {
  const [mutation, { ...rest }] = useMutation<{ login: string }>(mutationLogin);

  async function onMutate(
    credentials: TCredentials
  ): Promise<{ error?: string; data?: string }> {
    try {
      const { data } = await mutation({
        variables: {
          ...credentials,
        },
      });
      return { data: data?.login };
    } catch (e: any) {
      const error: string | undefined = e?.message ?? undefined;
      return { error };
    }
  }
  return onMutate;
}

// ------------------- //
// --Forgot password-- //
// ------------------- //

const mutationForgotPassword = gql`
  mutation resetPassword($mail: String!, $mode: String!) {
    resetPassword(mail: $mail, mode: $mode)
  }
`;

export function useForgotPassword() {
  const [mutation, { ...rest }] = useMutation<{ resetPassword: string }>(
    mutationForgotPassword
  );

  async function onMutate(mail: string) {
    const { data } = await mutation({ variables: { mail, mode: ENV.MODE } });

    Toast.show({
      type: "info",
      text1: "Email envoyé",
      text2: data?.resetPassword,
      visibilityTime: 5000,
    });
  }
  return onMutate;
}

// ------------------- //
// --Reset password-- //
// ------------------- //

const mutationResetPassword = gql`
  mutation setPwd($password: String!, $userId: String!) {
    setPassword(password: $password, userId: $userId)
  }
`;

export function useResetPassword() {
  const [mutation, { ...rest }] = useMutation(mutationResetPassword);

  async function onMutate(password: string, userId: string) {
    try {
      await mutation({ variables: { password, userId } });

      Toast.show({
        type: "success",
        text1: "Mot de passe modifié",
        visibilityTime: 4000,
      });
    } catch (e: any) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: (e as ApolloError).message,
        visibilityTime: 4000,
      });
    }
  }
  return onMutate;
}

// --------------- //
// --Create user-- //
// --------------- //

const mutationCreateUser = gql`
  mutation createUser($user: CreateUserBody!) {
    createUser(user: $user)
  }
`;

export function useCreateUser() {
  const [mutation, { ...rest }] = useMutation(mutationCreateUser);

  async function onMutate(user: TCreateUser) {
    try {
      console.log(user);
      await mutation({
        variables: { user },
      });

      Toast.show({
        type: "success",
        text1: "Compte crée avec succès",
        text2: "Connectez-vous",
        visibilityTime: 4000,
      });
      return true;
    } catch (e: any) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: (e as ApolloError).message,
        visibilityTime: 4000,
      });
      return false;
    }
  }

  return onMutate;
}

// --------------- //
// --Get home id-- //
// --------------- //

const queryGetHomeName = gql`
  query getHomeName {
    homeName
  }
`;

export function useHomeName() {
  const { data, ...rest } = useQuery<{ homeName: string }>(queryGetHomeName);

  return data?.homeName;
}
