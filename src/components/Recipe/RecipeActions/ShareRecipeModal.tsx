import { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from "react-qr-code";
import { TQrCode } from "../../../types/recipe";
import { Modal } from "../../shared/Modal";

export interface ShareRecipeModalRef {
  onOpen(id: string): void;
}

interface ShareRecipeModalProps {}

export const ShareRecipeModal = forwardRef<
  ShareRecipeModalRef,
  ShareRecipeModalProps
>((props, ref) => {
  const {} = props;

  const [value, setValue] = useState<TQrCode | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    onOpen: (id) => {
      setIsOpen(true);
      setValue({ action: "duplicateRecipe", data: { id } });
    },
  }));

  return (
    <Modal
      title={`Partager la recette`}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      style={styles.container}
    >
      <View style={styles.qrCodeContainer}>
        <QRCode value={JSON.stringify(value)} size={200} />
      </View>
      <Text style={styles.text}>
        Faire scanner ce Qr Code pour envoyer la recette à un autre utilisateur.
      </Text>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {},
  qrCodeContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
});
