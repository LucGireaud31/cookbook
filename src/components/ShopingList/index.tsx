import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import {
  useAddShoppingItems,
  useCreateShoppingItem,
  useMyShoppingList,
  useRemoveShoppingItem,
  useShoppingItems,
} from "../../services/shopping";
import { TShoppingItem, TShoppingItemBody } from "../../types/shopping";
import { lastValuesOf } from "../../utils/list";
import {
  formatImageUrlForDatabase,
  getProposalsByName,
} from "../../utils/shopping";
import { normalize } from "../../utils/string";
import { CaretIcon } from "../icons/icons";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import { Form } from "../shared/Form";
import { LoadingPage } from "../shared/LoadingPage";
import { SearchInput } from "../shared/SearchInput";
import { ShoppingListItem } from "./ShoppingListItems";
import { ShoppingMenuHeader } from "./ShoppingMenuHeader";

export function ShoppingList() {
  const navigation = useNavigation();

  const { data: allItems, query: queryAllItems } = useShoppingItems();

  const { data: myList, loading, query: queryMyList } = useMyShoppingList();

  const addToMyList = useAddShoppingItems();
  const removeToMyList = useRemoveShoppingItem();
  const createItem = useCreateShoppingItem();

  const form = useForm<{ search: string }>({ defaultValues: { search: "" } });

  const search = form.watch("search");
  const isSearching = search.length >= 2;

  const searchNormalized = normalize(search);
  const items = !isSearching
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

  function onCreateItem(item: TShoppingItemBody) {
    form.setValue("search", "");

    createItem(
      { ...item, image: lastValuesOf(item.image.split("/"), 2).join("/") },
      true
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ShoppingMenuHeader />,
    });
  }, []);

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
          {!isSearching ? (
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
              proposals={
                isSearching ? getProposalsByName(search, items) : undefined
              }
              onCreateProposal={onCreateItem}
            />
          )}
        </Container>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 15,
    height: "100%",
  },
  scrollContainer: {
    marginTop: 0,
    paddingHorizontal: 0,
    paddingTop: 10,
    width: "100%",
  },
});
