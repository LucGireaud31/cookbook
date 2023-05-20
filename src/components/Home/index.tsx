import { useTypes } from "../../services/types";
import { SearchInput } from "../shared/SearchInput";
import { TypeButton } from "./TypeButton";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Container } from "../Layout/Container";
import { FilterProps, useRecipesPagination } from "../../services/recipes";
import { TRecipeItem } from "../../types/recipe";
import { theme } from "../../theme/colors";
import { Recipe } from "./Recipe";
import { useNavigation } from "../../hooks/useNavigation";
import { FilterModal } from "./FilterModal";
import { queryGetTags } from "../../services/tags";
import { useForm } from "react-hook-form";
import {
  getFilterLocalStorage,
  getLastVersionLocalStorage,
  getPageLocalStorage,
  setFilterLocalStorage,
  setPageLocalStorage,
  updateLastVersionLocalStorage,
} from "../../services/asyncStorage";
import { Form } from "../shared/Form";
import { atom, useAtomValue } from "jotai";
import { getCurrentProjectVersion } from "../../utils/project";
import { getHistory } from "../../services/history";
import { HistoryModal, HistoryModalRef } from "../History";
import { LoadingPage } from "../shared/LoadingPage";

const LIST_SIZE = 1000;

export const filterAtom = atom<FilterProps | null>(null);

export function Home() {
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);

  const historyRef = useRef<HistoryModalRef>(null);

  const navigation = useNavigation();

  const form = useForm<FilterProps>();

  const filterValue = useAtomValue(filterAtom);

  const {
    client,
    data,
    refetch,
    query: queryRecipes,
    loading: loadingRecipes,
  } = useRecipesPagination();
  const {
    data: types,
    query: queryGetTypes,
    loading: loadingTypes,
  } = useTypes();

  const [recipes, setRecipes] = useState<TRecipeItem[] | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  async function onRefetch(newPage?: number) {
    const { data } = await refetch({
      limit: LIST_SIZE,
      page: newPage ?? page,
      filter: form.getValues(),
    });
    if (!data) return;

    setPageMax(data.recipes.pageMax);
    setRecipes(data.recipes.recipes);

    setFilterLocalStorage(form.getValues());
    if (newPage) {
      setPage(newPage);
      setPageLocalStorage(newPage);
    }
  }

  function onBefore() {
    if (page > 1) {
      onRefetch(page - 1);
    }
  }
  function onAfter() {
    if (page < pageMax) {
      onRefetch(page + 1);
    }
  }

  function onAddRecipe() {
    navigation.navigate("recipeEdit");
  }

  function onFilter() {
    setIsFilterOpen(true);
  }

  function handleFilterModalSubmit(filter: FilterProps) {
    setFilterLocalStorage(filter);
    onRefetch();
  }

  useEffect(() => {
    if (data) {
      setPageMax(data.pageMax);
      setRecipes(data.recipes);
    }
  }, [data]);

  useEffect(() => {
    // Triggered when tags change (need to remove old tags if selected)
    if (filterValue) {
      form.reset(filterValue);
      onRefetch();
    }
  }, [filterValue]);

  useEffect(() => {
    (async () => {
      // Default filter in local storage
      const filter = await getFilterLocalStorage();
      const page = await getPageLocalStorage();

      form.reset(filter);
      setPage(page);

      onRefetch(page);

      // History
      const localVersion = await getLastVersionLocalStorage();
      const realVersion = getCurrentProjectVersion();

      if (localVersion != realVersion) {
        // Call api
        const history = await getHistory(client, realVersion);
        // Display message
        historyRef.current?.onOpen(history);

        updateLastVersionLocalStorage();
      }
    })();
  }, []);

  if ((loadingRecipes || loadingTypes) && recipes == null) {
    return <LoadingPage label="Chargement des recettes..." />;
  }

  return (
    <Form form={form}>
      <View style={styles.container}>
        <SearchInput
          onFilter={onFilter}
          onSubmit={() => onRefetch()}
          {...form.register("search")}
        />
        <View style={styles.typeButtonsContainer}>
          {types?.map((type, i) => (
            <TypeButton
              key={type.name}
              imgUrl={type.image}
              label={type.name}
              isSelected={form.watch("types")?.includes(type.id)}
              onPress={() => {
                const selectedTypes = form.getValues("types");
                let newValue;
                if (selectedTypes?.includes(type.id)) {
                  // Remove current type
                  newValue = selectedTypes?.filter((t) => t != type.id);
                } else {
                  // Add current type
                  newValue = [...(selectedTypes ?? []), type.id];
                }
                form.setValue("types", newValue);
                onRefetch();
              }}
            />
          ))}
        </View>
        <Container
          style={styles.recipesContainer}
          queryToRefetch={[queryRecipes, queryGetTypes, queryGetTags]}
        >
          {recipes?.length == 0 && (
            <Text style={styles.noData}>Aucune recette</Text>
          )}
          <FlatList
            data={recipes}
            numColumns={3}
            style={{ paddingBottom: 20 }}
            renderItem={(item) => (
              <Recipe key={item.item.id} recipe={item.item} />
            )}
          />
        </Container>
        <FilterModal
          onSubmit={handleFilterModalSubmit}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </View>
      <HistoryModal ref={historyRef} />
    </Form>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  noData: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: "50%",
    color: theme[400],
    fontWeight: "700",
  },
  recipesContainer: {
    paddingHorizontal: 0,
  },
  paginationContainer: {
    marginRight: 5,
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    flexDirection: "row",
  },

  paginationLabel: {
    color: theme[400],
    fontWeight: "700",
    fontSize: 20,
  },
  typeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    marginBottom: 10,
  },
  addButton: {
    position: "absolute",
    right: 0,
    bottom: 70,
    backgroundColor: theme[300],
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});
