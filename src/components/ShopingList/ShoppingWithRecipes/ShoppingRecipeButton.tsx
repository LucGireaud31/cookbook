import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { gray, theme } from "../../../theme/colors";
import { wrapText } from "../../../utils/string";
import { CheckIcon } from "../../icons/icons";

interface ShoppingRecipeButtonProps {
  isSelected: boolean;
  image?: string;
  name: string;
  onPress(newStatus: boolean): void;
  style?: any;
}

export function ShoppingRecipeButton(props: ShoppingRecipeButtonProps) {
  const { name, image, style, onPress, isSelected } = props;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(!isSelected)}
      activeOpacity={0.5}
    >
      <View
        style={{
          ...styles.checkbox,
          ...(isSelected && styles.checkBoxSelected),
        }}
      >
        {isSelected && <CheckIcon size={23} color="white" />}
      </View>
      <View style={styles.recipeContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={{ ...styles.image, backgroundColor: theme[400] }} />
        )}
        <Text style={styles.name}>{wrapText(name, 25)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const checkboxSize = 30;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  checkbox: {
    width: checkboxSize,
    height: checkboxSize,
    borderWidth: 3,
    borderColor: gray[300],
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  checkBoxSelected: {
    borderWidth: 0,
    backgroundColor: theme[400],
  },
  recipeContainer: {
    backgroundColor: "white",
    height: "100%",
    width: Dimensions.get("screen").width - 15 * 2 - 20 * 2 - checkboxSize,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  name: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
  },
});
