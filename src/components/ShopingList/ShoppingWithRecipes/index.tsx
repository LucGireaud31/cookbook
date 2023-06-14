import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";
import { useAllMiniRecipes } from "../../../services/recipes";
import { useAddIngredientsRecipesInShopping } from "../../../services/shopping";
import { TMiniRecipe } from "../../../types/recipe";
import { TShopingRecipeToAdd } from "../../../types/shopping";
import { normalize, toPlural } from "../../../utils/string";
import { Container } from "../../Layout/Container";
import { Button } from "../../shared/Button";
import { Form } from "../../shared/Form";
import { SearchInput } from "../../shared/SearchInput";
import { ShoppingRecipeButton } from "./ShoppingRecipeButton";

interface ShoppingWithRecipesProps {}

export function ShoppingWithRecipes(props: ShoppingWithRecipesProps) {
  const {} = props;
  const { goBack } = useNavigation();

  const form = useForm<{ search: string }>({ defaultValues: { search: "" } });
  const { data, query } = useAllMiniRecipes({ haveIngredients: true });

  const addRecipesIngredientsToList = useAddIngredientsRecipesInShopping();

  const [selectedRecipes, setSelectedRecipes] = useState<TShopingRecipeToAdd[]>(
    []
  );
  const [filteredRecipes, setFilteredRecipes] = useState<TMiniRecipe[]>([]);

  const nbRecipes = selectedRecipes.length;

  function handleIngredientPress(id: string, newStatus: boolean) {
    if (newStatus) {
      setSelectedRecipes([...selectedRecipes, { id }]);
    } else {
      setSelectedRecipes(selectedRecipes.filter((r) => r.id != id));
    }
  }

  async function onSubmit() {
    await addRecipesIngredientsToList(selectedRecipes);
    goBack();
  }

  const currentSearch = normalize(form.watch("search"));

  useEffect(() => {
    if (data) {
      setFilteredRecipes(
        currentSearch.length > 0
          ? data.filter((r) => {
              const name = normalize(r.name);
              return (
                name.includes(currentSearch) || currentSearch.includes(name)
              );
            })
          : data
      );
    }
  }, [data, currentSearch]);

  return (
    <View style={styles.container}>
      <Form form={form}>
        <SearchInput
          onSubmit={() => {}}
          {...form.register("search")}
          placeholder="Rechercher une recette..."
        />
        <Container
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
          queryToRefetch={[query]}
        >
          {filteredRecipes?.map((recipe) => (
            <ShoppingRecipeButton
              key={recipe.id}
              isSelected={
                selectedRecipes.find((r) => r.id == recipe.id) != null
              }
              image={recipe.image}
              name={recipe.name}
              onPress={(status) => handleIngredientPress(recipe.id, status)}
            />
          ))}
        </Container>
        <Button
          style={styles.button}
          isDisabled={nbRecipes == 0}
          onPress={onSubmit}
        >
          Ajouter les ingrédients{" "}
          {nbRecipes == 1
            ? "d'une recette"
            : `de ${nbRecipes} ${toPlural("recette", nbRecipes)}`}
        </Button>
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
  button: {
    height: 50,
    width: "100%",
    marginBottom: 30,
  },
});
