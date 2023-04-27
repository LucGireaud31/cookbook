import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { theme } from "../../theme/colors";
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
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useImperativeHandle(ref, () => ({
    onOpen: async () => {
      await getPermission();
      setIsScanned(false);
      setIsOpen(true);
    },
  }));

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
      <BarCodeScanner onBarCodeScanned={onScan} style={styles.camera} />
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
