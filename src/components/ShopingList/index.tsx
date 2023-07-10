import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import { useAllMiniRecipes } from "../../services/recipes";
import {
  useAddIngredientsRecipesInShopping,
  useAddShoppingItems,
  useCreateShoppingItem,
  useMyShoppingList,
  useRemoveShoppingItem,
  useShoppingItems,
} from "../../services/shopping";
import { TShoppingItem, TShoppingItemBody } from "../../types/shopping";
import { lastValuesOf } from "../../utils/list";
import { sleep } from "../../utils/promise";
import {
  formatImageUrlForDatabase,
  getProposalsByName,
} from "../../utils/shopping";
import { normalize } from "../../utils/string";
import { Container } from "../Layout/Container";
import { Form } from "../shared/Form";
import { LoadingPage } from "../shared/LoadingPage";
import { SearchInput } from "../shared/SearchInput";
import { ShoppingListItem } from "./ShoppingListItems";
import { ShoppingMenuHeader } from "./ShoppingMenuHeader";

export function ShoppingList() {
  const navigation = useNavigation();

  const searchRef = useRef<TextInput>(null);

  const { data: allItems, query: queryAllItems } = useShoppingItems();
  const { data: miniRecipes, query: queryMiniRecipes } = useAllMiniRecipes({
    haveIngredients: true,
  });

  const { data: myList, loading, query: queryMyList } = useMyShoppingList();

  const addToMyList = useAddShoppingItems();
  const removeToMyList = useRemoveShoppingItem();
  const createItem = useCreateShoppingItem();
  const addRecipesIngredientsToList = useAddIngredientsRecipesInShopping();

  const form = useForm<{ search: string }>({ defaultValues: { search: "" } });

  const search = form.watch("search");

  const [defaultSearch, setDefaultSearch] = useState<string>();

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

  const itemsRecipe = !isSearching
    ? []
    : miniRecipes
        ?.map<TShoppingItem>((r) => ({
          id: r.id,
          name: r.name,
          image: r.image as string,
          isRecipe: true,
        }))
        .filter((i) => {
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
    onItemClick();

    addToMyList(formatImageUrlForDatabase([item]));
  }

  function onCreateItem(item: TShoppingItemBody) {
    onItemClick();

    createItem(
      { ...item, image: lastValuesOf(item.image.split("/"), 2).join("/") },
      true
    );
  }

  function onRecipeAdd(item: TShoppingItem) {
    onItemClick();
    addRecipesIngredientsToList([{ id: item.id }]);
  }

  async function onItemClick() {
    form.setValue("search", "");
    searchRef?.current?.focus();
    setDefaultSearch(undefined);

    await sleep(1);

    setDefaultSearch("");
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
          inputRef={searchRef}
          {...form.register("search")}
          debounced={0}
          placeholder="Que voulez-vous acheter ?"
          defaultSearch={defaultSearch}
        />
        <Container
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
          queryToRefetch={[queryAllItems, queryMyList, queryMiniRecipes]}
        >
          {!isSearching ? (
            <ShoppingListItem
              items={myList}
              selected={myList}
              onDelete={onDeleteItem}
              title="Ma liste"
            />
          ) : (
            <>
              <ShoppingListItem
                items={items}
                onAdd={onAddItem}
                onDelete={onDeleteItem}
                selected={myList}
                proposals={getProposalsByName(search, items)}
                onCreateProposal={onCreateItem}
              />

              <ShoppingListItem
                title="Recettes"
                items={itemsRecipe}
                onAdd={onRecipeAdd}
                placeholder=""
              />
            </>
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
