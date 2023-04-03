import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Modal } from "../Modal";

export interface DeletionModalRef {
  onOpen(label: string, data?: any): void;
}

interface DeletionModalProps {
  onDelete(data?: any): void;
}

export const DeletionModal = forwardRef<DeletionModalRef, DeletionModalProps>(
  (props, ref) => {
    const { onDelete } = props;
    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState<any>();

    const [label, setLabel] = useState("");

    useImperativeHandle(ref, () => ({
      onOpen: (label: string, data) => {
        setIsOpen(true);
        setLabel(label);

        if (data != undefined) setData(data);
      },
    }));

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Suppression"
        onSubmit={() => {
          setIsOpen(false);
          onDelete(data);
        }}
        onButton2Press={() => setIsOpen(false)}
        submitButtonLabel="Supprimer"
        buttonStyle={styles.button}
        titleStyle={styles.title}
      >
        <Text style={styles.label}>
          Êtes-vous sûr de vouloir supprimer {label} ?
        </Text>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  label: { color: "gray", margin: 5 },
  title: {
    color: "red",
  },
  button: {
    backgroundColor: "red",
  },
});
