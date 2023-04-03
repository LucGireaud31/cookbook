import { CameraType, Camera, CameraCapturedPicture } from "expo-camera";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Modal } from "../../Modal";
import { theme } from "../../../../theme/colors";

interface CameraModalProps {
  onPictureTake(picture: CameraCapturedPicture): void;
}
export interface CameraModalRef {
  onOpen(): void;
}

export const CameraModal = forwardRef<CameraModalRef, CameraModalProps>(
  (props, ref) => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [isGrandted, setIsGranted] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const camRef = useRef<Camera>(null);

    useImperativeHandle(ref, () => ({
      async onOpen() {
        setIsOpen(true);
        if (!permission?.granted) {
          requestPermission();
        } else {
          setIsGranted(true);
        }
      },
    }));

    function takePhoto() {
      camRef.current?.takePictureAsync({
        async onPictureSaved(picture) {
          props.onPictureTake(picture);
          setIsOpen(false);
        },
      });
    }

    function toggleCameraType() {
      setType((current) =>
        current === CameraType.back ? CameraType.front : CameraType.back
      );
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        containerStyle={styles.container}
      >
        <Camera ref={camRef} style={styles.camera} type={type} ratio="1:1">
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleCameraType}>
              <Image style={styles.swapIcon} source={require("./swap.png")} />
            </TouchableOpacity>
          </View>
        </Camera>
        {!permission?.granted && !isGrandted && (
          <Text style={styles.grantAccessError}>
            Veuillez autoriser l'accès à l'appareil photo
          </Text>
        )}
        <TouchableOpacity onPress={takePhoto}>
          <View style={styles.takePhotoIcon} />
        </TouchableOpacity>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  camera: { width: "100%", height: 300 },
  container: {
    width: 300,
    alignItems: "center",
    backgroundColor: "black",
    padding: 0,
    overflow: "hidden",
  },
  buttonContainer: {
    position: "absolute",
    right: 0,
    backgroundColor: "white",
    borderBottomLeftRadius: 25,
    padding: 5,
  },
  swapIcon: {
    width: 40,
    height: 40,
    tintColor: theme[400],
  },
  takePhotoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 3,
    marginVertical: 5,
  },
  grantAccessError: {
    color: "white",
  },
});
