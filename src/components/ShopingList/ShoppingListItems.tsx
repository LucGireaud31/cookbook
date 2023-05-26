import { useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { TShoppingItem, TShoppingItemBody } from "../../types/shopping";
import { IngredientButton } from "../shared/form/IngredientButton";
import { MyFlatList } from "../shared/MyFlatList";

interface ShoppingListItemProps {
  items: TShoppingItem[];
  noDataMessage?: string;
  onAdd?(item: TShoppingItem): void;
  onDelete?(item: TShoppingItem): void;
  selected?: TShoppingItem[];
  proposals?: TShoppingItem[];
  onCreateProposal?(item: TShoppingItemBody): void;
}

export function ShoppingListItem(props: ShoppingListItemProps) {
  const {
    items,
    noDataMessage = "La liste est vide",
    onAdd,
    onDelete,
    selected,
    proposals = [],
    onCreateProposal,
  } = props;

  const isSelected = useCallback(
    (item: TShoppingItem) => {
      return (selected?.filter((s) => s.id == item.id).length ?? 0) >= 1;
    },
    [selected]
  );

  if (items.length + proposals.length == 0)
    return <Text style={styles.noData}>{noDataMessage}</Text>;

  return (
    <MyFlatList
      data={[...items, ...proposals]}
      colNumber={3}
      rowGap={10}
      colGap={10}
      item={(item, itemWidth) => (
        <IngredientButton
          name={item.name}
          image={item.image}
          isSelected={isSelected(item)}
          onPress={() =>
            isSelected(item)
              ? onDelete?.(item)
              : item.id
              ? onAdd?.(item)
              : onCreateProposal?.({
                  name: item.name,
                  image: item.image,
                  quantity: item.quantity,
                })
          }
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
