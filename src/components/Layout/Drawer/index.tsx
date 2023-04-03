import { useSetAtom } from "jotai";
import { ReactNode, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";
import { tokenAtom } from "../../../Navigator";
import { setTokenLocalStorage } from "../../../services/asyncStorage";
import { LogoutIcon, ShareIcon } from "../../icons/icons";
import { Divider } from "../../shared/Divider";
import { ShareHomeModal, ShareHomeModalRef } from "./ShareHomeModal";

interface DrawerProps {}

export function Drawer(props: DrawerProps) {
  const {} = props;

  const { navigate } = useNavigation();

  const setToken = useSetAtom(tokenAtom);

  const shareModalRef = useRef<ShareHomeModalRef>(null);

  function logOut() {
    setToken(null);
    setTokenLocalStorage(null);
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
        <Link icon={<ShareIcon />} onPress={shareModalRef.current?.onOpen}>
          Partager mes recettes
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
    marginLeft: 10,
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
    paddingVertical: 5,
  },
  link: {
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 15,
  },
});
