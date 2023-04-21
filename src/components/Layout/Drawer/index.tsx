import { useApolloClient } from "@apollo/client";
import { useSetAtom } from "jotai";
import { ReactNode, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "../../../hooks/useNavigation";
import { tokenAtom } from "../../../Navigator";
import { setTokenLocalStorage } from "../../../services/asyncStorage";
import { getHistory } from "../../../services/history";
import { useDuplicateRecipe } from "../../../services/recipes";
import { TQrCode } from "../../../types/recipe";
import { getCurrentProjectVersion } from "../../../utils/project";
import { HistoryModal, HistoryModalRef } from "../../History";
import {
  HistoryIcon,
  LogoutIcon,
  ScanIcon,
  ShareIcon,
} from "../../icons/icons";
import {
  ScanQrCodeModal,
  ScanQrCodeModalRef,
} from "../../Login/ScanQrCodeModal";
import { Divider } from "../../shared/Divider";
import { ShareHomeModal, ShareHomeModalRef } from "./ShareHomeModal";

interface DrawerProps {}

export function Drawer(props: DrawerProps) {
  const {} = props;

  const { navigate } = useNavigation();

  const client = useApolloClient();

  const duplicateRecipe = useDuplicateRecipe();

  const setToken = useSetAtom(tokenAtom);

  const shareModalRef = useRef<ShareHomeModalRef>(null);
  const scanQrCodeModalRef = useRef<ScanQrCodeModalRef>(null);
  const historyRef = useRef<HistoryModalRef>(null);

  function logOut() {
    setToken(null);
    setTokenLocalStorage(null);
  }

  async function onNews() {
    const realVersion = getCurrentProjectVersion();

    const history = await getHistory(client, realVersion);
    // Display message
    historyRef.current?.onOpen(history);
  }

  async function onScan(data: string) {
    try {
      const {
        data: { id },
        action,
      }: TQrCode = JSON.parse(data);

      if (action == "duplicateRecipe") {
        try {
          await duplicateRecipe(id);
          Toast.show({
            text1: "Copie réalisée avec succès",
            type: "success",
          });
        } catch {
          Toast.show({
            text1: "Copie impossible à réaliser",
            text2: "Une erreur imprévue est survenue",
            type: "error",
          });
        }
      }
    } catch {
      Toast.show({
        text1: "QR Code invalide",
        text2: "Veuillez réessayer",
        type: "error",
      });
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/icon.png")}
      />
      <View style={styles.body}>
        <Link
          icon={
            <Image
              source={require("./tag.png")}
              style={{ width: 25, height: 25 }}
            />
          }
          onPress={() => navigate("tags")}
        >
          Tags
        </Link>
        <Divider style={{ marginVertical: 10 }} />

        <Link icon={<ShareIcon />} onPress={shareModalRef.current?.onOpen}>
          Partager mon compte
        </Link>
        <Link
          icon={<ScanIcon color="black" size={32} />}
          onPress={scanQrCodeModalRef.current?.onOpen}
        >
          Dupliquer une recette d'un utilisateur
        </Link>
        <Link icon={<HistoryIcon size={32} />} onPress={onNews}>
          Nouveauté
        </Link>
        <Divider style={{ marginVertical: 10 }} />
        <Link icon={<LogoutIcon />} color="red" onPress={logOut}>
          Déconnexion
        </Link>
      </View>
      <View style={styles.footer}>
        <Text style={styles.underlined}>Livre de recette v1.0.0</Text>
        <Text style={styles.myName}>Luc Gireaud</Text>
      </View>
      <ShareHomeModal ref={shareModalRef} />
      <ScanQrCodeModal
        ref={scanQrCodeModalRef}
        label="Scanner un Qr Code pour recevoir la recette associée"
        onScan={onScan}
      />
      <HistoryModal ref={historyRef} />
    </View>
  );
}

interface LinkProps {
  children: ReactNode;
  icon: ReactNode;
  color?: string;
  onPress?(): void;
}

function Link({ children, icon, color = "black", onPress }: LinkProps) {
  return (
    <TouchableOpacity style={styles.linkContainer} onPress={onPress}>
      {icon}
      <Text style={[styles.link, { color }]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 20,
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 40,
  },
  footer: { flexDirection: "row", justifyContent: "space-between" },
  underlined: {
    textDecorationLine: "underline",
  },
  myName: {
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  link: {
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 15,
  },
});
