import { ConnexionButton } from "../../shared/ConnexionButton";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Text } from "react-native";

interface GoogleConnectionButtonProps {}

WebBrowser.maybeCompleteAuthSession();

const clientId =
  "1090233144614-f36t4rehimpq843m8ljjjil9d254rjmt.apps.googleusercontent.com";
const androidClientId =
  "1090233144614-jpej1rn39n01o9bndflt4bllg2rp9jb9.apps.googleusercontent.com";

export function GoogleConnectionButton(props: GoogleConnectionButtonProps) {
  const {} = props;

  const [userInfo, setUserInfo] = useState(null);

  const [_, response, promptAsync] = useAuthRequest({
    androidClientId,
    clientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      getUserInfo(response.authentication?.accessToken ?? "");
    }
  }, [response]);

  async function getUserInfo(token: string) {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();

      const { email, id } = user;

      setUserInfo(user);
    } catch (error) {}
  }

  return (
    <>
      <ConnexionButton
        icon={require("./google.png")}
        label="Continuer avec google"
        onPress={() => promptAsync()}
      />
      <Text>{JSON.stringify(userInfo)}</Text>
    </>
  );
}
