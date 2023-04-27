import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { StyleSheet, Text, Dimensions, View } from "react-native";
import { theme } from "../../theme/colors";
import { sleep } from "../../utils/promise";
import { Modal } from "../shared/Modal";

export interface ScanQrCodeModalRef {
  onOpen(): void;
}

interface ScanQrCodeModalProps {
  onScan(data: string): void;
  label: string;
}

export const ScanQrCodeModal = forwardRef<
  ScanQrCodeModalRef,
  ScanQrCodeModalProps
>((props, ref) => {
  const { onScan: onScanProps, label } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [isScanned, setIsScanned] = useState(false);
  const [display, setDisplay] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useImperativeHandle(ref, () => ({
    onOpen: async () => {
      await getPermission();
      setDisplay(false);
      setIsScanned(false);
      setIsOpen(true);
    },
  }));

  useEffect(() => {
    if (isOpen) {
      (async () => {
        await sleep(200);
        setDisplay(true);
      })();
    }
  }, [isOpen]);

  async function getPermission() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  }

  function onScan({ data }: BarCodeEvent) {
    if (isScanned) return;
    setIsScanned(true);

    setIsOpen(false);
    onScanProps(data);
  }
  if (!hasPermission) return null;
  return (
    <Modal
      containerStyle={styles.modal}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      titleStyle={{
        color: "red",
      }}
    >
      {display ? (
        <BarCodeScanner onBarCodeScanned={onScan} style={styles.camera} />
      ) : (
        <View style={styles.camera} />
      )}
      <Text style={styles.title}>{label}</Text>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get("screen").width - 50,
    padding: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 22,
    paddingHorizontal: 5,
    paddingVertical: 15,
    position: "absolute",
    color: theme[400],
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
  },
  camera: {
    width: Dimensions.get("screen").width - 50,
    height: Dimensions.get("screen").height * 0.7,
    backgroundColor: "black",
  },
});
