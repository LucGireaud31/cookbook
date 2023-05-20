import { View, StyleSheet, Text } from "react-native";
import { TShoppingItem } from "../../types/shopping";
import { IngredientButton } from "../shared/form/IngredientButton";

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
        <IngredientButton
          key={item.id}
          name={item.name}
          image={item.image}
          isSelected={false}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 40,
  },
  noData: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
  },
});
