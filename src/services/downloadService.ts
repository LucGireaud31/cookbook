import { gql, useMutation } from "@apollo/client";
import { getDownloadStepKey, setDownloadStep } from "./asyncStorage";
import { getLocales } from "expo-localization";

const mutationSetStep = gql`
  mutation setStep(
    $key: String!
    $step: Int!
    $country: String
    $city: String
  ) {
    setStep(key: $key, step: $step, country: $country, city: $city)
  }
`;

export function useSetDownloadStep() {
  const [mutation, { ...rest }] = useMutation(mutationSetStep);

  async function onMutate(step: number, keyProps?: string) {
    const key = keyProps ?? (await getDownloadStepKey());

    let country = "";

    try {
      country = getLocales()[0].regionCode ?? "";
    } catch {}

    try {
      await mutation({
        variables: {
          key,
          step,
          country,
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
