import { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { THistory } from "../../types/history";
import { Modal } from "../shared/Modal";

export interface HistoryModalRef {
  onOpen(history: THistory): void;
}

interface HistoryModalProps {}

export const HistoryModal = forwardRef<HistoryModalRef, HistoryModalProps>(
  (props, ref) => {
    const {} = props;
    const [isOpen, setIsOpen] = useState(false);

    const [history, setHistory] = useState<THistory>();

    useImperativeHandle(ref, () => ({
      onOpen: (history) => {
        setHistory(history);
        setIsOpen(true);
      },
    }));

    if (!history) return null;

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Nouveauté !"
      >
        <View style={styles.container}>
          {history.description.map((desc, i) => (
            <Text style={styles.content} key={i}>{`\u2022 ${desc}`}</Text>
          ))}
        </View>
        <Text style={styles.date}>Mise à jour du {history.date}</Text>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginTop: 10,
  },
  content: { fontSize: 17, marginVertical: 5 },
  date: {
    color: "gray",
  },
});
