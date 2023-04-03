import { useMemo, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useIngredients } from "../../../services/ingredients";
import { useAllMiniRecipes } from "../../../services/recipes";
import { theme } from "../../../theme/colors";
import { TRecipeIngredient } from "../../../types/ingredients";
import { RecipeQuantityTypeEnum } from "../../../types/recipe";
import { normalize, wrapText } from "../../../utils/string";
import { GlassIcon } from "../../icons/icons";
import { InputFormProps, useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { Input } from "./Input";

interface IngredientInputProps extends InputFormProps {
  withRecipes?: boolean;
  mappedIngredients?: string[];
  isMulti?: boolean;
  ingredientOnly?: boolean;
}

export function IngredientInput(props: IngredientInputProps) {
  const {
    isRequired,
    withRecipes = false,
    mappedIngredients = [],
    isMulti = false,
    ...rest
  } = props;

  const { data } = useIngredients();
  const { data: dependencies } = withRecipes
    ? useAllMiniRecipes()
    : { data: [] };

  const ingredients = useMemo(
    () => [
      ...(data?.map((d) => ({ ...d, isRecipe: false })) ?? []),
      ...(dependencies?.map((d) => ({
        ...d,
        isRecipe: true,
        unities: [d.quantity?.type ?? RecipeQuantityTypeEnum.Personns],
      })) ?? []),
    ],
    [data, dependencies]
  );

  const { setValue, getValues, watch } = useFormContext<
    TRecipeIngredient | { ingredients: string[] }
  >();

  const error = useFieldError("id");

  const [search, setSearch] = useState(
    Array.isArray(getValues()) ? "" : getValues("name") ?? ""
  );

  const defaultId: string | string[] = useMemo(
    () => (isMulti ? getValues("ingredients") : getValues("id")),
    []
  );

  useController({
    name: isMulti ? "ingredients" : "id",
    rules: {
      required: isRequired,
    },
  });

  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  const selectedId: string | string[] = isMulti
    ? watch("ingredients")
    : watch("id");

  const filteredIngredients =
    (search.length > 0
      ? ingredients?.filter(
          (ing) =>
            (Array.isArray(selectedId)
              ? !selectedId.includes(ing.id)
              : ing.id != selectedId) &&
            (!mappedIngredients.includes(ing.id) ||
              (Array.isArray(defaultId)
                ? defaultId.includes(ing.id)
                : ing.id == defaultId)) &&
            normalize(ing.name).includes(normalize(search))
        )
      : null) ?? [];

  function handleIngredientPress(
    id: string,
    name: string,
    image: string,
    unities: number[],
    isRecipe: boolean
  ) {
    if (isMulti) {
      setValue("ingredients", [...(getValues("ingredients") as string[]), id]);
    } else {
      setValue("id", id);
      setValue("name", name);
      setValue("image", image);
      setValue("unities", unities);
      setValue("isRecipe", isRecipe);
      if (unities.length == 1) {
        setValue("quantity.type", unities[0]);
      }

      scrollRef.current?.scrollTo({
        x: 0,
        animated: true,
      });

      if (name != "") inputRef.current?.blur();
    }
  }

  function handleDeleteIngredient(id: string) {
    if (isMulti) {
      setValue(
        "ingredients",
        getValues("ingredients").filter((i) => i != id)
      );
    }
  }

  function onSubmitEditing() {
    if (!isMulti && filteredIngredients.length == 1 && selectedId == "") {
      const ing = filteredIngredients[0];

      handleIngredientPress(
        ing.id,
        ing.name,
        ing.image,
        ing.unities,
        ing.isRecipe
      );
      setSearch(ing.name);
    }
  }

  const isError = error != null;

  return (
    <FieldContainer error={error} isRequired={isRequired} {...rest}>
      <View
        style={[
          styles.container,
          isError && { borderColor: "red", borderWidth: 2 },
        ]}
      >
        <Input
          inputRef={inputRef}
          style={{
            ...styles.input,
            ...(selectedId != "" && !isMulti && { color: theme[400] }),
          }}
          onSubmitEditing={onSubmitEditing}
          value={search}
          onChangeText={(text) => {
            setSearch(text);

            if (!isMulti && selectedId != "" && text != getValues("name")) {
              handleIngredientPress("", "", "", [], false);
              setSearch("");
            }
          }}
          placeholder="Nom de l'ingrédient"
        />
        <View style={styles.icon}>
          <GlassIcon />
        </View>
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="always"
          horizontal={true}
          style={[
            styles.ingredientsContainer,
            isError && { borderColor: "red", borderTopWidth: 2 },
          ]}
        >
          {!isMulti && getValues("id") != "" && (
            <Ingredient
              name={getValues("name")}
              image={getValues("image")}
              isSelected={true}
              isRecipe={getValues("isRecipe")}
            />
          )}
          {isMulti &&
            getValues("ingredients")?.map((id) => {
              const ing = ingredients.find((i) => i.id == id);

              if (!ing) return null;
              return (
                <Ingredient
                  key={ing.id}
                  name={ing.name}
                  image={ing.image}
                  onPress={() => handleDeleteIngredient(ing.id)}
                  isRecipe={ing.isRecipe}
                  isSelected={true}
                />
              );
            })}
          {filteredIngredients.map((ing) => (
            <Ingredient
              key={ing.id}
              name={ing.name}
              image={ing.image}
              onPress={() => {
                handleIngredientPress(
                  ing.id,
                  ing.name,
                  ing.image,
                  ing.unities,
                  ing.isRecipe
                );
                !isMulti && setSearch(ing.name);
              }}
              isRecipe={ing.isRecipe}
              isSelected={false}
            />
          ))}
        </ScrollView>
      </View>
    </FieldContainer>
  );
}

function Ingredient({
  name,
  image,
  onPress,
  isSelected,
  isRecipe,
}: {
  name: string;
  image: string;
  onPress?(): void;
  isSelected: boolean;
  isRecipe: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={(e) => {
        e.stopPropagation();
        onPress?.();
      }}
    >
      <View
        style={[
          styles.ingredient,
          isSelected && {
            backgroundColor: theme[400],
            opacity: 1,
          },
        ]}
      >
        <Image
          style={isRecipe ? styles.recipeIcon : styles.ingredientIcon}
          source={{ uri: image }}
        />
        <Text style={isRecipe ? styles.recipeLabel : styles.ingredientLabel}>
          {wrapText(name, 20)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 163,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: theme[400],
  },
  input: { height: 30, borderWidth: 0 },
  icon: { position: "absolute", right: 5, top: 6 },
  ingredientsContainer: {
    borderTopWidth: 1,
    borderColor: theme[400],
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  ingredient: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: theme[300] + "90",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    opacity: 0.7,
  },
  recipeIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  recipeLabel: {
    color: "white",
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
    position: "absolute",
    bottom: 5,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: theme[400],
  },
  ingredientIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  ingredientLabel: {
    color: "white",
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
});
