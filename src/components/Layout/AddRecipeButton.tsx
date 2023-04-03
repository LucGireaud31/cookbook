import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "../../hooks/useNavigation";
import { theme } from "../../theme/colors";
import { SVGCirclePlus } from "../icons/icons";

interface AddRecipeButtonProps {}

export function AddRecipeButton(props: AddRecipeButtonProps) {
  const {} = props;

  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate("recipeEdit")}
    >
      <SVGCirclePlus size={30} />
      <Text style={styles.label}>Recette</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    color: theme[400],
    fontWeight: "600",
    fontSize: 15,
  },
});
