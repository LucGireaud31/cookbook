import { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Modal } from "../../shared/Modal";
import { generatePdfUri } from "../../../utils/pdf";
import {
  createDownloadResumable,
  documentDirectory,
  getContentUriAsync,
} from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Spinner } from "../../shared/Spinner";
import { theme } from "../../../theme/colors";

export interface DisplayRecipePdfLoaderModalRef {
  onOpen(id: string, name: string): void;
}

interface DisplayRecipePdfLoaderModalProps {}

export const DisplayRecipePdfLoaderModal = forwardRef<
  DisplayRecipePdfLoaderModalRef,
  DisplayRecipePdfLoaderModalProps
>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    onOpen: async (id, name) => {
      setIsOpen(true);
      await handleDownload(id, name);
      setIsOpen(false);
    },
  }));

  async function handleDownload(id: string, name: string) {
    const downloadResumable = createDownloadResumable(
      generatePdfUri(id, name),
      documentDirectory + `${name}.pdf`
    );

    try {
      const result = await downloadResumable.downloadAsync();

      if (result) {
        const cUri = await getContentUriAsync(result.uri);

        await startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
          type: "application/pdf",
        });
      }
    } catch (e) {
      Toast.show({
        text1: "Une erreure est survenue",
        text2: "Veuillez réessayer dans quelques minutes 😟",
        type: "error",
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <View style={styles.container}>
        <Spinner size={60} />
        <Text style={styles.text}>Chargement du pdf en cours...</Text>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    marginTop: 15,
    color: theme[400],
    fontWeight: "500",
  },
});
