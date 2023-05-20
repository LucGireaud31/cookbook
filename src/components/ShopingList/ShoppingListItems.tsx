import { View, StyleSheet, Text } from "react-native";
import { TShoppingItem } from "../../types/shopping";
import { Ingredient } from "../shared/form/MultiIngredientInput";

interface ShoppingListItemProps {
  items: TShoppingItem[];
  noDataMessage?: string;
}

export function ShoppingListItem(props: ShoppingListItemProps) {
  const { items, noDataMessage = "Aucun élément" } = props;

  if (items.length == 0)
    return <Text style={styles.noData}>{noDataMessage}</Text>;

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Ingredient
          key={item.id}
          name={item.name}
          image={item.image}
          isSelected={true}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  noData: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
  },
});
