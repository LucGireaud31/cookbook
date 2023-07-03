import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TNotification } from "../../types/notification";
import { Button } from "../shared/Button";
import { Modal } from "../shared/Modal";
import * as Linking from "expo-linking";
import { setLastOnceNotifId } from "../../services/asyncStorage";

export interface NotificationModalRef {
  onOpen(
    notification: TNotification,
    title?: string,
    displayButton?: boolean
  ): void;
}

interface NotificationModalProps {}

export const NotificationModal = forwardRef<
  NotificationModalRef,
  NotificationModalProps
>((props, ref) => {
  const {} = props;
  const [isOpen, setIsOpen] = useState(false);

  const [notif, setNotif] = useState<TNotification>();
  const [displayButton, setDisplayButton] = useState(true);

  useImperativeHandle(ref, () => ({
    onOpen: (notif, hardTitle, displayButton = true) => {
      setDisplayButton(displayButton);
      setNotif({ ...notif, title: hardTitle ?? notif.title });
      setIsOpen(true);
    },
  }));

  async function onClose() {
    if (!notif!.version) {
      await setLastOnceNotifId(notif!.id);
    }
    setIsOpen(false);
  }

  if (!notif) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={notif.title}>
      <Text style={styles.content}>{notif.message}</Text>
      {displayButton && (
        <Button
          style={styles.button}
          onPress={async () => {
            onClose();
            if (notif.buttonHref) {
              Linking.openURL(notif.buttonHref);
            }
          }}
        >
          {notif.buttonLabel}
        </Button>
      )}
      <Text style={styles.date}>Message du {notif.date}</Text>
    </Modal>
  );
});

const styles = StyleSheet.create({
  content: { fontSize: 17, marginVertical: 5, marginBottom: 30, marginTop: 10 },
  date: {
    color: "gray",
  },
  button: {
    marginBottom: 10,
  },
});
