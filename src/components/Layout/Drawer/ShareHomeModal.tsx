import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Modal } from "../../shared/Modal";
import QRCode from "react-qr-code";
import { useHomeName } from "../../../services/credentials";
import { sleep } from "../../../utils/promise";

export interface ShareHomeModalRef {
  onOpen(): void;
}

interface ShareHomeModalProps {}

const TIME = 5;

export const ShareHomeModal = forwardRef<
  ShareHomeModalRef,
  ShareHomeModalProps
>((props, ref) => {
  const {} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState(false);

  const homeName = useHomeName();
  useImperativeHandle(ref, () => ({
    onOpen: () => {
      setIsOpen(true);
    },
  }));

  useEffect(() => {
    if (isOpen) {
      (async () => {
        await sleep(TIME * 1000);
        setDisplay(true);
      })();
    }
  }, [isOpen]);

  if (!homeName) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        setDisplay(false);
      }}
      title="Mon code d'invitation"
    >
      <View style={styles.container}>
        {display && (
          <>
            <Text style={styles.code}>{homeName}</Text>
            <QRCode value={homeName} />
          </>
        )}
        {!display && <Text>Le code apparaitra dans {TIME} secondes</Text>}
        <Text style={styles.warning}>
          Attention ! toute personne ayant accès à ce code pourra modifier vos
          recettes
        </Text>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  code: { marginBottom: 10, fontSize: 15 },
  warning: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
  },
});
