import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigation } from "../../hooks/useNavigation";
import { useShoppingItems } from "../../services/shopping";
import { TShoppingItem } from "../../types/shopping";
import { Form } from "../shared/Form";
import { SearchInput } from "../shared/SearchInput";
import { ShoppingListItem } from "./ShoppingListItems";

export function ShoppingList() {
  const { navigate } = useNavigation();

  const searchItems = useShoppingItems();

  const [items, setItems] = useState<TShoppingItem[]>([]);

  const form = useForm<{ search: string }>({ defaultValues: { search: "" } });

  const currentSearch = form.watch("search");

  const searchDebounce = useDebounce(currentSearch, 200);

  useEffect(() => {
    if (searchDebounce) {
      (async () => {
        const newItems = await searchItems(searchDebounce);
        setItems(newItems ?? []);
      })();
    } else {
      setItems([]);
    }
  }, [searchDebounce]);

  function onSubmit({ search }: { search: string }) {}

  return (
    <View style={styles.container}>
      <Form form={form}>
        <SearchInput onSubmit={() => {}} {...form.register("search")} />
        <ShoppingListItem items={currentSearch.length == 0 ? [] : items} />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 10, paddingHorizontal: 15 },
});
