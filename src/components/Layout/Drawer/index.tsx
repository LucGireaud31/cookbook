import { useApolloClient } from "@apollo/client";
import { useSetAtom } from "jotai";
import { ReactNode, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";
import { tokenAtom } from "../../../Navigator";
import { setTokenLocalStorage } from "../../../services/asyncStorage";
import { getHistory } from "../../../services/history";
import { getCurrentProjectVersion } from "../../../utils/project";
import { HistoryModal, HistoryModalRef } from "../../History";
import {
  HistoryIcon,
  LightIcon,
  LinkIcon,
  LogoutIcon,
  ScanIcon,
} from "../../icons/icons";
import { Divider } from "../../shared/Divider";
import { ShareHomeModal, ShareHomeModalRef } from "./ShareHomeModal";
import * as Linking from "expo-linking";

interface DrawerProps {}

export function Drawer(props: DrawerProps) {
  const {} = props;

  const { navigate } = useNavigation();

  const client = useApolloClient();

  const setToken = useSetAtom(tokenAtom);

  const shareModalRef = useRef<ShareHomeModalRef>(null);
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

        <Link icon={<LinkIcon />} onPress={shareModalRef.current?.onOpen}>
          Associer mon compte
        </Link>
        <Link
          icon={<ScanIcon color="black" size={32} />}
          onPress={() => navigate("scanRecipeFromUser")}
        >
          Récupérer une recette d'un utilisateur
        </Link>
        <Link
          icon={<LightIcon color="black" size={32} />}
          onPress={() => navigate("idea")}
        >
          Proposer une idée
        </Link>

        <Link icon={<HistoryIcon size={32} />} onPress={onNews}>
          Nouveauté
        </Link>
        <Divider style={{ marginVertical: 10 }} />
        <Link icon={<LogoutIcon />} color="red" onPress={logOut}>
          Déconnexion
        </Link>
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => Linking.openURL("https://lucgireaud.fr")}
      >
        <Text style={styles.underlined}>À propos du développeur</Text>
      </TouchableOpacity>
      <ShareHomeModal ref={shareModalRef} />
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
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
