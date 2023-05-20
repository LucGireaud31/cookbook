import { useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import { useShoppingItems } from "../../services/shopping";
import { normalize } from "../../utils/string";
import { Container } from "../Layout/Container";
import { Form } from "../shared/Form";
import { SearchInput } from "../shared/SearchInput";
import { ShoppingListItem } from "./ShoppingListItems";

export function ShoppingList() {
  const { navigate } = useNavigation();

  const data = useShoppingItems();

  const form = useForm<{ search: string }>({ defaultValues: { search: "" } });

  const search = form.watch("search");
  const searchNormalized = normalize(search);
  const items =
    search.length < 2
      ? []
      : data?.filter((i) => {
          const itemNormalized = normalize(i.name);
          return (
            itemNormalized.includes(searchNormalized) ||
            searchNormalized.includes(itemNormalized)
          );
        }) ?? [];

  function onSubmit({ search }: { search: string }) {}

  return (
    <View style={styles.container}>
      <Form form={form}>
        <SearchInput onSubmit={() => {}} {...form.register("search")} />
        <Container style={styles.scrollContainer}>
          <ShoppingListItem items={items} />
        </Container>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 10, paddingHorizontal: 15 },
  scrollContainer: {
    marginTop: 0,
    paddingTop: 10,
    marginBottom: 50,
  },
});
