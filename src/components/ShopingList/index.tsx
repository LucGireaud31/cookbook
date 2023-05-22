import { useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import {
  useAddShoppingItems,
  useMyShoppingList,
  useRemoveShoppingItem,
  useShoppingItems,
} from "../../services/shopping";
import { TShoppingItem } from "../../types/shopping";
import { formatImageUrlForDatabase } from "../../utils/shopping";
import { normalize } from "../../utils/string";
import { Container } from "../Layout/Container";
import { Form } from "../shared/Form";
import { LoadingPage } from "../shared/LoadingPage";
import { SearchInput } from "../shared/SearchInput";
import { ShoppingListItem } from "./ShoppingListItems";

export function ShoppingList() {
  const { navigate } = useNavigation();

  const { data: allItems, query: queryAllItems } = useShoppingItems();

  const { data: myList, loading, query: queryMyList } = useMyShoppingList();
  const addToMyList = useAddShoppingItems();
  const removeToMyList = useRemoveShoppingItem();

  const form = useForm<{ search: string }>({ defaultValues: { search: "" } });

  const search = form.watch("search");
  const searchNormalized = normalize(search);
  const items =
    search.length < 2
      ? []
      : allItems?.filter((i) => {
          const itemNormalized = normalize(i.name);
          return (
            itemNormalized.includes(searchNormalized) ||
            searchNormalized.includes(itemNormalized)
          );
        }) ?? [];

  function onDeleteItem(item: TShoppingItem) {
    removeToMyList(item.id);
  }

  function onAddItem(item: TShoppingItem) {
    form.setValue("search", "");
    addToMyList(formatImageUrlForDatabase([item]));
  }

  if (loading) {
    return <LoadingPage label="Chargement de la liste" />;
  }

  return (
    <View style={styles.container}>
      <Form form={form}>
        <SearchInput
          onSubmit={() => {}}
          {...form.register("search")}
          placeholder="Que voulez-vous acheter ?"
        />
        <Container
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
          queryToRefetch={[queryAllItems, queryMyList]}
        >
          {search.length < 2 ? (
            <ShoppingListItem
              items={myList}
              selected={myList}
              onDelete={onDeleteItem}
            />
          ) : (
            <ShoppingListItem
              items={items}
              onAdd={onAddItem}
              onDelete={onDeleteItem}
              selected={myList}
            />
          )}
        </Container>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 10, paddingHorizontal: 15 },
  scrollContainer: {
    marginTop: 0,
    paddingHorizontal: 0,
    paddingTop: 10,
    marginBottom: 30,
    width: "100%",
    minHeight: "90%",
  },
});
