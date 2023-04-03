import { useController } from "react-hook-form";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { DividerAddButton } from "../DividerAddButton";
import { useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { ListItem } from "../ListItem";

export interface TListItem {
  id: string;
  name: string;
  image: string;
  rightLabel?: string;
  leftColor?: string;
  isRecipe?: boolean;
  onEdit?(): void;
  onDelete?(): void;
}

interface ListItemInputProps {
  name?: string;
  isRequired?: boolean;
  label?: string;
  items: TListItem[];
  onAdd?(): void;
}

export function ListItemInput(props: ListItemInputProps) {
  const { label, isRequired, name = "", items, onAdd } = props;

  const error = useFieldError(name);

  useController({
    rules: {
      required: isRequired,
    },
    name,
  });

  return (
    <FieldContainer
      label={label}
      error={error}
      isRequired={isRequired}
      errorMessage="Un ingrédient est requis"
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      <DividerAddButton onPress={() => onAdd?.()} />
    </FieldContainer>
  );
}

function Item({ item }: { item: TListItem }) {
  return (
    <TouchableOpacity onPress={() => item.onEdit?.()}>
      <ListItem
        label={item.name}
        rightLabel={item.rightLabel}
        leftColor={item.leftColor}
        onDelete={item.onDelete}
        leftIcon={
          <Image
            style={[item.isRecipe ? styles.itemRecipeImg : styles.itemImg]}
            source={{ uri: item.image }}
          />
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: 5,
  },
  itemRecipeImg: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
});
