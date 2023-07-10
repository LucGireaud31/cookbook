import { capitalize } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useIngredients } from "../../../services/ingredients";
import { useAllMiniRecipes } from "../../../services/recipes";
import { theme } from "../../../theme/colors";
import { TRecipeIngredient } from "../../../types/ingredients";
import { RecipeQuantityTypeEnum } from "../../../types/recipe";
import { generateShortUID } from "../../../utils/crypto";
import { getLetterImage } from "../../../utils/ingredient";
import { normalize } from "../../../utils/string";
import { GlassIcon } from "../../icons/icons";
import { InputFormProps, useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { IngredientButton } from "./IngredientButton";
import { Input } from "./Input";

interface RichSelectProps extends InputFormProps {
  mappedIngredients?: string[];
  onSubmit?(unities: number[]): void;
  defaultSearch?: string;
  inputRef?: React.RefObject<TextInput>;
}

export function RichSelect(props: RichSelectProps) {
  const {
    isRequired,
    mappedIngredients = [],
    defaultSearch,
    inputRef: ref,
    ...rest
  } = props;

  const { data } = useIngredients();
  const { data: dependencies } = useAllMiniRecipes();

  const ingredients = useMemo(
    () => [
      ...(data?.map((d) => ({ ...d, isRecipe: false })) ?? []),
      ...(dependencies?.map((d) => ({
        ...d,
        isRecipe: true,
        unities: [d.quantity?.type ?? RecipeQuantityTypeEnum.Personns],
        plural: d.name,
      })) ?? []),
    ],
    [data, dependencies]
  );

  const { setValue, getValues, watch } = useFormContext<TRecipeIngredient>();

  const error = useFieldError("id");

  const [search, setSearch] = useState(getValues("name") ?? "");

  const defaultId = useMemo(() => getValues("id"), []);

  useEffect(() => {
    if (defaultSearch != undefined) {
      setSearch(defaultSearch);
    }
  }, [defaultSearch]);

  useController({
    name: "id",
    rules: {
      required: isRequired,
    },
  });

  const inputRef = ref ?? useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  const selectedId = watch("id");

  const [isCreatingIngredient, setIsCreatedIngredient] = useState(false);

  const filteredIngredients = useMemo(() => {
    if (search.length == 0) return [];

    return (
      ingredients.filter((ing) => {
        if (ing.id == selectedId) return false;
        if (mappedIngredients.includes(ing.id) && ing.id != defaultId)
          return false;

        const ingNormalized = normalize(ing.name);
        const searchNormalized = normalize(search);

        return (
          ingNormalized.includes(searchNormalized) ||
          searchNormalized.includes(ingNormalized)
        );
      }) ?? []
    );
  }, [search, ingredients, selectedId, mappedIngredients, defaultId]);

  function handleIngredientPress(
    id: string,
    name: string,
    image: string,
    unities: number[],
    isRecipe: boolean,
    plural: string
  ) {
    setIsCreatedIngredient(
      ingredients.filter((i) => i.id == id).length == 0 && id != ""
    );

    setValue("id", id);
    setValue("name", name);
    setValue("image", image);
    setValue("isRecipe", isRecipe);
    if (unities.length == 1) {
      setValue("quantity.type", unities[0]);
    }
    setValue("plural", plural ?? name);

    scrollRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
    if (name != "") inputRef.current?.blur();
    // onSubmit?.(unities);
  }

  function onSubmitEditing() {
    if (filteredIngredients.length == 1 && selectedId == "") {
      const ing = filteredIngredients[0];

      handleIngredientPress(
        ing.id,
        ing.name,
        ing.image ?? "",
        ing.unities,
        ing.isRecipe,
        (ing as any).plural
      );
      setSearch(ing.name);
    }
  }

  const defaultIngredient = useMemo(() => {
    const noramalizedSearch = normalize(search.replace(/[0-9]/g, "").trim());
    if (noramalizedSearch.length > 1) {
      return {
        id: generateShortUID() + generateShortUID(),
        name: capitalize(search).trim(),
        image: getLetterImage(noramalizedSearch[0]),
        unities: [0, 1, 2, 3, 4, 5, 6, 7],
        isRecipe: false,
        plural: capitalize(search).trim(),
      };
    }
    return null;
  }, [search]);

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
            ...(selectedId != "" && { color: theme[400] }),
          }}
          onSubmitEditing={onSubmitEditing}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            scrollRef.current?.scrollTo({
              x: 0,
            });
            if (selectedId != "" && text != getValues("name")) {
              handleIngredientPress("", "", "", [], false, "");
              setSearch("");
            } else if (text.length < 2) {
              handleIngredientPress("", "", "", [], false, "");
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
          {getValues("id") != "" && (
            <IngredientButton
              name={getValues("name")}
              image={getValues("image")}
              isSelected={true}
              isRecipe={getValues("isRecipe")}
            />
          )}
          {filteredIngredients.map((ing) => (
            <IngredientButton
              key={ing.id}
              name={ing.name}
              image={ing.image ?? ""}
              onPress={() => {
                handleIngredientPress(
                  ing.id,
                  ing.name,
                  ing.image ?? "",
                  ing.unities,
                  ing.isRecipe,
                  (ing as any).plural
                );
                setSearch(ing.name);
              }}
              isRecipe={ing.isRecipe}
              isSelected={false}
            />
          ))}
          {search.length > 1 &&
            !isCreatingIngredient &&
            ingredients.filter((i) => normalize(i.name) == normalize(search))
              .length == 0 &&
            defaultIngredient && (
              <IngredientButton
                image={defaultIngredient.image}
                isRecipe={defaultIngredient.isRecipe}
                isSelected={false}
                name={defaultIngredient.name}
                onPress={() =>
                  handleIngredientPress(
                    defaultIngredient.id,
                    defaultIngredient.name,
                    defaultIngredient.image,
                    defaultIngredient.unities,
                    defaultIngredient.isRecipe,
                    defaultIngredient.plural
                  )
                }
              />
            )}
        </ScrollView>
      </View>
    </FieldContainer>
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
});
