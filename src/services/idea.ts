import { gql, useMutation } from "@apollo/client";
import Toast from "react-native-toast-message";

const mutationSendIdea = gql`
  mutation sendIdea($message: String!) {
    idea(message: $message)
  }
`;

export function useSendIdea() {
  const [mutation] = useMutation<{ idea: string }>(mutationSendIdea);

  async function onMutate(message: string) {
    try {
      const { data } = await mutation({ variables: { message } });

      Toast.show({
        type: "success",
        visibilityTime: 5000,
        text1: data?.idea,
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Une erreur est survenue",
      });
    }
  }
  return onMutate;
}
