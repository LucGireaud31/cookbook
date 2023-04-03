import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TRecipeIngredient } from "../../types/ingredients";
import { RecipeQuantityTypeEnum } from "../../types/recipe";
import { ingredientsUnitOptions } from "../../utils/ingredientQuantityType";
import { Form } from "../shared/Form";
import { IngredientInput } from "../shared/form/IngredientInput";
import { Input } from "../shared/form/Input";
import { Select } from "../shared/form/Select";
import { Modal } from "../shared/Modal";

export interface ModalAddIngredientToRecipeRef {
  onOpen(ingredient?: TRecipeIngredient): void;
}
interface ModalAddIngredientToRecipeProps {
  onAdd(newIngredient: TRecipeIngredient): void;
  onEdit(id: string, newIngredient: TRecipeIngredient): void;
  mappedIngredients?: string[];
}

const RECIPE_UNIT_OPTIONS = [
  {
    label: "Personne(s)",
    key: RecipeQuantityTypeEnum.Personns.toString(),
  },
  {
    label: "Unité",
    key: RecipeQuantityTypeEnum.Unit.toString(),
  },
];

const DEFAULT_INGREDIENT = {
  id: "",
  name: "",
  image: "",
  quantity: undefined,
  unities: undefined,
  isRecipe: false,
};

export const ModalAddIngredientToRecipe = forwardRef<
  ModalAddIngredientToRecipeRef,
  ModalAddIngredientToRecipeProps
>((props, ref) => {
  const { onEdit, onAdd, mappedIngredients = [] } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [defaultIngredient, setDefaultIngredient] =
    useState<TRecipeIngredient>();
  const form = useForm<TRecipeIngredient>();

  useImperativeHandle(ref, () => ({
    onOpen: (ingredient?: TRecipeIngredient) => {
      setIsOpen(true);
      setDefaultIngredient(ingredient);

      if (ingredient) {
        form.reset({
          ...ingredient,
          ...(ingredient.isRecipe && { unities: [ingredient.quantity.type] }),
        });
      } else {
        form.reset(DEFAULT_INGREDIENT);
      }
    },
  }));

  function handleSubmit(values: TRecipeIngredient) {
    setIsOpen(false);
    const newValues = {
      ...values,
      quantity: {
        type: parseInt(values.quantity.type.toString()),
        value: values.quantity.value,
      },
    };

    if (defaultIngredient) {
      onEdit(defaultIngredient.id, newValues);
    } else {
      onAdd(newValues);
    }
  }

  const isRecipe = form.getValues("isRecipe");

  const isDisabled = isRecipe || (form.getValues("unities")?.length ?? 0) == 0;
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Ingrédient"
      onSubmit={form.handleSubmit(handleSubmit)}
      submitButtonLabel="Ajouter"
    >
      <Form form={form}>
        <IngredientInput
          label="Ingrédient"
          isRequired
          withRecipes={true}
          mappedIngredients={mappedIngredients}
        />
        <Select
          label="Unité"
          placeholder="Aucune unité sélectionée..."
          isRequired
          data={[
            ...(isRecipe ? RECIPE_UNIT_OPTIONS : ingredientsUnitOptions),
          ].filter((u) => form.getValues("unities")?.includes(parseInt(u.key)))}
          isDisabled={isDisabled}
          {...form.register("quantity.type")}
        />
        <Input
          label="Quantité"
          isRequired
          type="numeric"
          placeholder="Quantité..."
          {...form.register("quantity.value")}
        />
      </Form>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {},
});