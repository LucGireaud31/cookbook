import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import {
  uploadRecipeImage,
  useCreateRecipe,
  useUpdateRecipe,
} from "../../services/recipes";
import { useTags } from "../../services/tags";
import { useTypes } from "../../services/types";
import { theme } from "../../theme/colors";
import { TRecipeIngredient } from "../../types/ingredients";
import { StackComponent } from "../../types/reactNavigation";
import {
  QuantityBody,
  RecipeQuantityTypeEnum,
  TRecipe,
  TRecipeBody,
  TRecipeForm,
} from "../../types/recipe";
import {
  formatIngredientName,
  formatIngredientQuantityLabel,
} from "../../utils/ingredientQuantityType";
import { removeFieldInObject } from "../../utils/object";
import {
  getLastOfSeparatedString,
  toPlural,
  wrapText,
} from "../../utils/string";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import { Form } from "../shared/Form";
import { ImageInput } from "../shared/form/ImageInput";
import { Input } from "../shared/form/Input";
import { ListItemInput } from "../shared/form/ListItemInput";
import { PreprationInput } from "../shared/form/PreparationInput";
import { QuantityInput } from "../shared/form/QuantityInput";
import { Select } from "../shared/form/Select";
import { TagInput } from "../shared/form/TagInput";
import {
  ModalAddIngredientToRecipe,
  ModalAddIngredientToRecipeRef,
} from "./ModalAddIngredientToRecipe";

interface EditFormProps extends StackComponent {}

const DEFAULT_RECIPE = {
  ingredients: [],
  recipes: [],
  tags: [],
  type: null,
  image: null,
};

export function EditForm(props: EditFormProps) {
  const { route } = props;

  const navigation = useNavigation();

  const onCreate = useCreateRecipe();
  const onUpdate = useUpdateRecipe();

  const form = useForm<TRecipeForm>();

  const { data: types, query: queryGetTypes } = useTypes();
  const { data: tags, query: queryGetTags } = useTags();

  const modalRef = useRef<ModalAddIngredientToRecipeRef>(null);

  const recipe: TRecipe | null = route?.params?.recipe ?? null;

  useEffect(() => {
    navigation.setOptions({
      rightIcon: null,
      title: wrapText(recipe?.name ?? "Nouvelle recette", 20),
    });

    form.reset({
      type: recipe?.type?.id,
      quantity: recipe?.quantity ?? {
        type: RecipeQuantityTypeEnum.Personns,
        value: 1,
      },
      content: (recipe?.content.length ?? 0) > 0 ? recipe?.content : [""],
      tags: recipe?.tags?.map((t) => t.id) || [],
      id: recipe?.id,
      name: recipe?.name,
      note: recipe?.note,
      image: recipe?.image,
      ingredients: recipe?.ingredients,
      isFavorite: recipe?.isFavorite,
      recipes: recipe?.recipes.map((r) => ({
        ...r,
        quantity: r.quantity as QuantityBody,
      })),
      ...(!recipe && DEFAULT_RECIPE),
    });
  }, [recipe]);

  function onEditIngredient(id: string, newItem: TRecipeIngredient) {
    const key: "recipes" | "ingredients" = newItem.isRecipe
      ? "recipes"
      : "ingredients";
    let modified = false;

    const newItems = form.getValues(key).map((ing) => {
      if (ing.id == id) {
        modified = true;
        return newItem;
      }
      return ing;
    });
    if (!modified) {
      onDeleteIngredient(id, !newItem.isRecipe);
      onAddIngredient(newItem);
    } else {
      form.setValue(key, newItems);
    }
  }

  function onAddIngredient(newItem: TRecipeIngredient) {
    const key: any = newItem.isRecipe ? "recipes" : "ingredients";

    const newItems = [...form.getValues(key), newItem];

    form.setValue(key, newItems);
  }

  function onDeleteIngredient(id: string, isRecipe: boolean) {
    const key: "recipes" | "ingredients" = isRecipe ? "recipes" : "ingredients";

    const newItems = form.getValues(key).filter((ing) => ing.id != id);

    form.setValue(key, newItems);
  }

  async function onSubmit(newValue: TRecipeForm) {
    let value: TRecipeBody = {
      ...newValue,
      image: newValue.image ? getLastOfSeparatedString(newValue.image) : "",
      recipes: newValue.recipes.map((r) => ({
        id: r.id ?? "",
        quantity: r.quantity?.value ?? 1,
      })),
      tags: tags.filter((t) => newValue.tags.includes(t.id)),
    };

    if (newValue.image != recipe?.image && newValue.image) {
      // Need to upload
      const imageName = await uploadRecipeImage(newValue.image);
      value.image = imageName;
    }

    removeFieldInObject({ obj: value, key: "isRecipe", recursively: true });

    if (recipe) {
      // Update
      onUpdate(recipe.id, value);
      navigation.goBack();
    } else {
      // Create
      const newRecipe = await onCreate(value);

      if (newRecipe) {
        navigation.goBack();
        navigation.navigate("recipePage", {
          id: newRecipe.id,
          name: newRecipe.name,
        });
      }
    }
  }

  return (
    <Form form={form}>
      <Container
        keyboardShouldPersistTaps="always"
        queryToRefetch={[queryGetTags, queryGetTypes]}
      >
        <Input
          label="Nom"
          isRequired
          placeholder="Nom de la recette..."
          {...form.register("name")}
        />
        <Select
          label="Type"
          data={types?.map((t) => ({ key: t.id, label: t.name }))}
          placeholder="Aucun type sélectionné"
          {...form.register("type")}
        />
        <TagInput label="Tags" tags={tags} {...form.register("tags")} />
        <QuantityInput
          label="Quantité"
          isRequired
          item1={{
            label: toPlural("Personne", form.watch("quantity.value")),
            value: RecipeQuantityTypeEnum.Personns.toString(),
          }}
          item2={{
            label: toPlural(
              form.watch("name")?.split(" ")[0] ?? "Unité",
              form.watch("quantity.value") ?? 1
            ),
            value: RecipeQuantityTypeEnum.Unit.toString(),
          }}
          {...form.register("quantity")}
        />
        <ListItemInput
          label="Ingrédients"
          items={
            [
              ...(form
                .watch("recipes")
                ?.map((r) => ({ ...r, isRecipe: true })) ?? []),
              ...(form.watch("ingredients") ?? []),
            ]?.map((ing) => ({
              id: ing.id ?? "",
              image: ing.image ?? "",
              name: ing.name
                ? formatIngredientName(
                    ing.name,
                    (ing as any).plural ?? "",
                    ing.quantity?.type,
                    ing.quantity?.value,
                    ing.isRecipe
                  )
                : "",
              isRecipe: ing.isRecipe,
              rightLabel:
                ing.quantity != undefined &&
                ing.quantity.type != undefined &&
                ing.quantity.value
                  ? formatIngredientQuantityLabel(
                      ing.quantity.type,
                      ing.quantity.value,
                      ing.isRecipe
                    )
                      .toString()
                      .replace(".", ",")
                  : undefined,
              onDelete: () =>
                ing.id && onDeleteIngredient(ing.id, ing.isRecipe ?? false),
              onEdit: () => {
                modalRef.current?.onOpen(ing as TRecipeIngredient);
              },
            })) ?? []
          }
          onAdd={() => modalRef.current?.onOpen()}
          {...form.register("ingredients")}
        />
        <PreprationInput
          label="Préparation"
          isRequired
          {...form.register("content")}
        />
        <ImageInput label="Image" {...form.register("image")} />
      </Container>
      <Button
        style={styles.button}
        onPress={form.handleSubmit(onSubmit)}
        isSubmiting={form.formState.isSubmitting}
      >
        Valider
      </Button>
      <ModalAddIngredientToRecipe
        ref={modalRef}
        onEdit={onEditIngredient}
        onAdd={onAddIngredient}
        mappedIngredients={[
          ...(form.getValues("ingredients")?.map((i) => i.id ?? "") ?? []),
          ...(form.getValues("recipes")?.map((r) => r.id ?? "") ?? []),
        ]}
      />
    </Form>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
});
