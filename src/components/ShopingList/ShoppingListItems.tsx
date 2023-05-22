import { useCallback } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { TShoppingItem } from "../../types/shopping";
import { IngredientButton } from "../shared/form/IngredientButton";
import { MyFlatList } from "../shared/MyFlatList";

interface ShoppingListItemProps {
  items: TShoppingItem[];
  noDataMessage?: string;
  onAdd?(item: TShoppingItem): void;
  onDelete?(item: TShoppingItem): void;
  selected?: TShoppingItem[];
}

export function ShoppingListItem(props: ShoppingListItemProps) {
  const {
    items,
    noDataMessage = "La liste est vide",
    onAdd,
    onDelete,
    selected,
  } = props;

  const isSelected = useCallback(
    (item: TShoppingItem) => {
      return (selected?.filter((s) => s.id == item.id).length ?? 0) >= 1;
    },
    [selected]
  );

  if (items.length == 0)
    return <Text style={styles.noData}>{noDataMessage}</Text>;

  return (
    <MyFlatList
      data={items}
      colNumber={3}
      rowGap={10}
      colGap={10}
      item={(item, itemWidth) => (
        <IngredientButton
          key={item.id}
          name={item.name}
          image={item.image}
          isSelected={isSelected(item)}
          onPress={() => (isSelected(item) ? onDelete?.(item) : onAdd?.(item))}
          style={{
            marginHorizontal: 0,
            width: itemWidth,
            height: itemWidth,
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  noData: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
    width: "100%",
    height: "100%",
  },
});
