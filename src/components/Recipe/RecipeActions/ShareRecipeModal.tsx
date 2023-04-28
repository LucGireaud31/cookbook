import { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Text, StyleProp, TextStyle } from "react-native";
import QRCode from "react-qr-code";
import { theme } from "../../../theme/colors";
import { TQrCode } from "../../../types/recipe";
import { generatePdfUri } from "../../../utils/pdf";
import { Modal } from "../../shared/Modal";

export interface ShareRecipeModalRef {
  onOpen(id: string, name: string): void;
}

interface ShareRecipeModalProps {}

const TEXTS = {
  user: "Pour recevoir une copie de la recette.",
  pdf: "Pour télécharger un pdf de la recette.",
};

export const ShareRecipeModal = forwardRef<
  ShareRecipeModalRef,
  ShareRecipeModalProps
>((props, ref) => {
  const {} = props;

  const [userValue, setUserValue] = useState<TQrCode | null>(null);
  const [pdfValue, setPdfValue] = useState<string | null>(null);
  const [type, setType] = useState<"user" | "pdf">();

  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    onOpen: (id, name) => {
      setType("user");
      setUserValue({ action: "duplicateRecipe", data: { id } });
      setPdfValue(generatePdfUri(id, name));
      setIsOpen(true);
    },
  }));

  return (
    <Modal
      title={`Partager la recette`}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      style={styles.container}
    >
      {type && (
        <>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={type == "pdf" ? pdfValue ?? "" : JSON.stringify(userValue)}
              size={200}
            />
          </View>
          <Text style={styles.text}> {TEXTS[type]}</Text>
          <View style={styles.switchContainer}>
            <Text
              style={[
                styles.switchLeft,
                type == "user" && styles.switchSelected,
              ]}
              onPress={() => setType("user")}
            >
              À un utilisateur
            </Text>
            <Text
              style={[
                styles.switchRight,
                type == "pdf" && styles.switchSelected,
              ]}
              onPress={() => setType("pdf")}
            >
              En pdf
            </Text>
          </View>
        </>
      )}
    </Modal>
  );
});

const switchBase: StyleProp<TextStyle> = {
  width: "50%",
  textAlign: "center",
  borderRadius: 25,
  textAlignVertical: "center",
};

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
  switchContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    borderWidth: 3,
    borderColor: theme[400],
    borderRadius: 25,
    height: 45,
  },
  switchLeft: {
    ...switchBase,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  switchRight: {
    ...switchBase,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  switchSelected: { backgroundColor: theme[400], color: "white" },
});
