import { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { CameraModal, CameraModalRef } from "../CameraModal";
import { useFieldError } from "../../Form";
import { FieldContainer } from "../../Form/FieldContainer";
import * as ImagePicker from "expo-image-picker";
import { XIcon } from "../../../icons/icons";
import { IconButton } from "../../IconButton";
import { manipulateAsync } from "expo-image-manipulator";

interface ImageInputProps {
  name?: string;
  isRequired?: boolean;
  label?: string;
}

const ICON_SIZE = 50;

export function ImageInput(props: ImageInputProps) {
  const { label, isRequired, name = "" } = props;

  const error = useFieldError(name);

  const [pickPhoto, setPickPhoto] = useState(false);

  const cameraModalRef = useRef<CameraModalRef>(null);

  const { field } = useController({
    rules: {
      required: isRequired,
    },
    name,
  });

  function onTakePhoto() {
    cameraModalRef.current?.onOpen();
  }

  async function changeImage(newUrl?: string) {
    if (!newUrl) {
      field.onChange(null);
      return;
    }

    const manipResult = await manipulateAsync(newUrl, undefined, {
      compress: 0.2,
    });

    field.onChange(manipResult.uri);
  }

  async function onPickPhoto() {
    if (pickPhoto) return;
    setPickPhoto(true);
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    setPickPhoto(false);

    if (!result.canceled) {
      changeImage(result.assets[0].uri);
    }
  }
  return (
    <FieldContainer label={label} error={error} isRequired={isRequired}>
      {field.value ? (
        <View style={styles.selectedImageContainer}>
          <Image style={styles.selectedImage} source={{ uri: field.value }} />
          <IconButton
            style={styles.removeImageContainer}
            icon={<XIcon size={20} />}
            onPress={() => changeImage(undefined)}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onTakePhoto}
          >
            <Image style={styles.image} source={require("./camera.png")} />
            <Text style={styles.legend}>Prendre une nouvelle photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPickPhoto}
          >
            <Image style={styles.image} source={require("./galery.png")} />

            <Text style={styles.legend}>Choisir dans la galerie</Text>
          </TouchableOpacity>
        </View>
      )}
      <CameraModal
        ref={cameraModalRef}
        onPictureTake={(picture) => {
          changeImage(picture.uri);
        }}
      />
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  selectedImageContainer: {
    position: "relative",
    height: 200,
    width: 200,
  },
  removeImageContainer: {
    position: "absolute",
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    right: -10,
    top: -10,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  legend: {
    width: "70%",
    textAlign: "center",
  },
});
