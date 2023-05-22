import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";
import { tokenAtom } from "../../../Navigator";
import { setTokenLocalStorage } from "../../../services/asyncStorage";
import { useCreateUser, useLoginOAuth } from "../../../services/credentials";
import { theme } from "../../../theme/colors";
import { TCreateUser } from "../../../types/credentials";
import { StackComponent } from "../../../types/reactNavigation";
import { ScanIcon } from "../../icons/icons";
import { Button } from "../../shared/Button";
import { DumpbTextInput } from "../../shared/form/DumbTextInput";
import { Highlight } from "../../shared/Highlight";
import { IconButton } from "../../shared/IconButton";
import { LoginContainer } from "../LoginContainer";
import { ScanQrCodeModal, ScanQrCodeModalRef } from "../ScanQrCodeModal";
import { HelpModal, HelpModalRef } from "./HelpModal";

interface ShareMyBookProps extends StackComponent {}

export function ShareMyBook(props: ShareMyBookProps) {
  const { route } = props;

  const { goBack } = useNavigation();

  const scanModalRef = useRef<ScanQrCodeModalRef>(null);
  const helpModalRef = useRef<HelpModalRef>(null);

  const [display, setDisplay] = useState(false);
  const [account, setAccount] = useState<TCreateUser | undefined>(
    route?.params
  );
  const setToken = useSetAtom(tokenAtom);

  const onCreateUser = useCreateUser();
  const loginOAuthUser = useLoginOAuth();

  if (!account) {
    goBack();
    return null;
  }

  async function onSubmit() {
    const token = route?.params.oAuth;

    if (token) {
      const data = await loginOAuthUser(
        token,
        "google",
        account?.existingHome ?? ""
      );
      const newToken = data?.needHome ? null : data?.data;

      if (newToken) {
        setTokenLocalStorage(newToken);
        setToken(newToken);
      }
      return;
    } else {
      const res = await onCreateUser(account!);

      if (res) {
        goBack();
        goBack();
      }
    }
  }

  function handleScanQrCode() {
    scanModalRef.current?.onOpen();
  }

  return (
    <LoginContainer
      displayHeader={false}
      containerStyle={{
        paddingHorizontal: 10,
      }}
    >
      <Text style={styles.title}>
        Mon livre de recette peut devenir <Highlight color>NOTRE</Highlight>{" "}
        livre de recettes.
      </Text>
      <View style={styles.head}>
        <Text style={[styles.question]}>
          Voulez-vous vous associer avec un utilisateur ?
        </Text>
        <View style={styles.answerContainer}>
          {!display && (
            <View style={styles.buttonContainer}>
              <Button onPress={() => setDisplay(true)}>Oui</Button>
              <Button style={{ marginLeft: 10 }} onPress={onSubmit}>
                Non, je suis seul
              </Button>
            </View>
          )}
          {display && (
            <>
              <Text>Code d'invitation de l'utilisateur</Text>
              <DumpbTextInput
                label="Code d'invitation"
                onSubmitEditing={onSubmit}
                value={account.existingHome}
                onChangeText={(newText) =>
                  setAccount({ ...account, existingHome: newText })
                }
                rightAddon={
                  <IconButton
                    icon={<ScanIcon size={30} />}
                    onPress={handleScanQrCode}
                  />
                }
              />
              <Text
                style={styles.helpLink}
                onPress={helpModalRef.current?.onOpen}
              >
                Comment peut-il trouver son code d'invitation ?
              </Text>

              <Button onPress={onSubmit} style={{ marginTop: 20 }}>
                Finaliser mon compte
              </Button>
            </>
          )}
        </View>
      </View>
      <ScanQrCodeModal
        ref={scanModalRef}
        label="Scanner le code d'invitation"
        onScan={(data) => setAccount({ ...account, existingHome: data })}
      />
      <HelpModal ref={helpModalRef} />
    </LoginContainer>
  );
}

const styles = StyleSheet.create({
  head: {
    height: Dimensions.get("screen").height * 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  question: { fontSize: 18, textAlign: "center" },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  answerContainer: {
    height: 100,
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helpLink: {
    alignSelf: "flex-start",
    marginTop: 20,
    color: theme[400],
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
