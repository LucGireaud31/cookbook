import { ReactNode, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal as ReactModal,
  Pressable,
  StyleProp,
  Text,
  ViewStyle,
  TextStyle,
  ModalProps,
} from "react-native";
import { gray, theme } from "../../theme/colors";
import { sleep } from "../../utils/promise";
import { XIcon } from "../icons/icons";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

interface ModalComponentProps extends ModalProps {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  isOpen: boolean;
  onClose(): void;
  title?: string;
  onSubmit?(): void;
  onButton2Press?(): void;
  submitButtonLabel?: string;
  button2Label?: string;
  closeButton?: boolean;
  closeOnOverlay?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  button2Style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  isSubmitting?: boolean;
  fontSizeButtons?: number;
}

export function Modal(props: ModalComponentProps) {
  const {
    isOpen,
    onClose,
    children,
    containerStyle,
    title,
    onSubmit,
    onButton2Press,
    submitButtonLabel = "Enregistrer",
    closeButton = false,
    closeOnOverlay = true,
    buttonStyle = {},
    titleStyle = {},
    overlayStyle = {},
    button2Label = "Annuler",
    button2Style = {},
    isSubmitting = false,
    fontSizeButtons,
    ...rest
  } = props;

  const [displayOverlay, setDisplayOverlay] = useState(false);

  const child = (
    <View
      {...(closeOnOverlay && { onStartShouldSetResponder: (event) => true })}
      style={[styles.container, containerStyle]}
    >
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {closeButton && (
        <IconButton
          onPress={close}
          icon={<XIcon size={32} color={gray[500]} />}
          style={styles.closeButton}
        />
      )}
      {children}
      {(onButton2Press || onSubmit) && (
        <View style={styles.footer}>
          {onButton2Press && (
            <Button
              onPress={onButton2Press}
              style={{ ...styles.button2, ...(button2Style as any) }}
              color="black"
              fontSize={fontSizeButtons}
            >
              {button2Label}
            </Button>
          )}
          {onSubmit && (
            <Button
              onPress={onSubmit}
              isSubmiting={isSubmitting}
              style={{ ...styles.button, ...(buttonStyle as any) }}
              fontSize={fontSizeButtons}
            >
              {submitButtonLabel}
            </Button>
          )}
        </View>
      )}
    </View>
  );

  useEffect(() => {
    (async () => {
      if (isOpen && rest.animationType == "slide") {
        await sleep(300);
        setDisplayOverlay(true);
      }
    })();
  }, [isOpen]);

  function close() {
    setDisplayOverlay(false);
    onClose();
  }

  return (
    <ReactModal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        close();
      }}
      {...rest}
    >
      {closeOnOverlay ? (
        <Pressable
          style={[
            styles.overlay,
            !displayOverlay &&
              rest.animationType == "slide" &&
              styles.overlayNotVisible,
            overlayStyle,
          ]}
          onPress={close}
        >
          {child}
        </Pressable>
      ) : (
        <View
          style={[
            styles.overlay,
            !displayOverlay &&
              rest.animationType == "slide" &&
              styles.overlayNotVisible,
            overlayStyle,
          ]}
        >
          {child}
        </View>
      )}
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000050",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayNotVisible: {
    backgroundColor: "transparent",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    minHeight: "5%",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: -5,
    color: theme[400],
    textAlign: "center",
  },
  footer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: { marginLeft: 5 },
  button2: {
    marginRight: 5,
    backgroundColor: gray[200],
  },
});
