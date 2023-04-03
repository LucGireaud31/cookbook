import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme/colors";

interface TypeButtonProps {
  label: string;
  imgUrl: string;
  onPress(): void;
  isSelected?: boolean;
}

export function TypeButton(props: TypeButtonProps) {
  const { label, imgUrl, onPress, isSelected } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.imageContainer,
          isSelected && { backgroundColor: theme[400] },
        ]}
      >
        <Image
          source={{ uri: imgUrl, cache: "reload" }}
          style={[styles.image, isSelected && { tintColor: "white" }]}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  imageContainer: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 27,
    height: 27,
  },
  label: {
    fontWeight: "700",
    fontSize: 11,
    marginTop: 5,
  },
});
