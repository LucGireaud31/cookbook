import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";

interface ShoppingListProps {}

export function ShoppingList(props: ShoppingListProps) {
  const {} = props;

  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Liste de courses</Text>
      <Text onPress={() => navigate("addFromRecipe")}>
        Ajouter via mes recettes
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
