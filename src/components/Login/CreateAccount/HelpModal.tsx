import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Modal } from "../../shared/Modal";

export interface HelpModalRef {
  onOpen(): void;
}

interface HelpModalProps {}

export const HelpModal = forwardRef<HelpModalRef, HelpModalProps>(
  (props, ref) => {
    const {} = props;
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      onOpen: () => {
        setIsOpen(true);
      },
    }));

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Comment trouver son code ?"
      >
        <Image source={require("./screen.jpeg")} style={styles.image} />
        <Text style={styles.subtitle}>
          Sur la page principal de l'utilisateur, cliquer sur le menu en haut à
          gauche puis sur 'Partager mes recettes'
        </Text>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 500,
    width: "100%",
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  subtitle: {
    color: "gray",
    textAlign: "center",
  },
});
