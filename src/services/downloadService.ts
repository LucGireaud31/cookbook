import { gql, useMutation } from "@apollo/client";
import { getDownloadStepKey, setDownloadStep } from "./asyncStorage";

const mutationSetStep = gql`
  mutation setStep($key: String!, $step: Int!) {
    setStep(key: $key, step: $step)
  }
`;

export function useSetDownloadStep() {
  const [mutation, { ...rest }] = useMutation(mutationSetStep);

  async function onMutate(step: number, keyProps?: string) {
    const key = keyProps ?? (await getDownloadStepKey());

    try {
      await mutation({
        variables: {
          key,
          step,
        },
      });

      await setDownloadStep(step);

      return true;
    } catch {
      return false;
    }
  }
  return onMutate;
}
