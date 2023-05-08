import { ConnexionButton } from "../../shared/ConnexionButton";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { useLoginOAuth } from "../../../services/credentials";
import { useNavigation } from "../../../hooks/useNavigation";
import { setTokenLocalStorage } from "../../../services/asyncStorage";
import { useSetAtom } from "jotai";
import { tokenAtom } from "../../../Navigator";

interface GoogleConnectionButtonProps {
  onSubmitingBegin(): void;
  onSubmitingEnd(): void;
}

WebBrowser.maybeCompleteAuthSession();

const clientId =
  "1090233144614-f36t4rehimpq843m8ljjjil9d254rjmt.apps.googleusercontent.com";
const androidClientId =
  "1090233144614-jpej1rn39n01o9bndflt4bllg2rp9jb9.apps.googleusercontent.com";

export function GoogleConnectionButton(props: GoogleConnectionButtonProps) {
  const { onSubmitingBegin, onSubmitingEnd } = props;

  const loginOAuthUser = useLoginOAuth();
  const setToken = useSetAtom(tokenAtom);

  const navigation = useNavigation();

  const [_, response, promptAsync] = useAuthRequest({
    androidClientId,
    clientId,
  });

  useEffect(() => {
    (async () => {
      if (
        response?.type === "success" &&
        response.authentication?.accessToken
      ) {
        onSubmitingBegin();
        const token = response.authentication?.accessToken;

        const res = await loginOAuthUser(token, "google");
        const newToken = res?.data;

        if (res?.needHome) {
          navigation.navigate("shareMyBook", { oAuth: res.data });
        } else if (newToken) {
          setTokenLocalStorage(newToken);
          setToken(newToken);
        }
        onSubmitingEnd();
      }
    })();
  }, [response]);

  return (
    <ConnexionButton
      icon={require("./google.png")}
      label="Continuer avec google"
      onPress={() => promptAsync()}
    />
  );
}
