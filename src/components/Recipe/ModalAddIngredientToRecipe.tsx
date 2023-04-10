import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TRecipeIngredient } from "../../types/ingredients";
import { RecipeQuantityTypeEnum } from "../../types/recipe";
import { ingredientsUnitOptions } from "../../utils/ingredientQuantityType";
import { Form } from "../shared/Form";
import { Input } from "../shared/form/Input";
import { Select } from "../shared/form/Select";
import { Modal } from "../shared/Modal";
import { RichSelect } from "../shared/form/RichSelect";
import {
  useCreateIngredient,
  useIngredients,
} from "../../services/ingredients";
import { lastValueOf } from "../../utils/list";

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
  isRecipe: false,
};

export const ModalAddIngredientToRecipe = forwardRef<
  ModalAddIngredientToRecipeRef,
  ModalAddIngredientToRecipeProps
>((props, ref) => {
  const { onEdit, onAdd, mappedIngredients = [] } = props;

  const [isOpen, setIsOpen] = useState(false);

  // const [unities, setUnities] = useState<number[]>([]);

  const { data: ingredients } = useIngredients();
  const createIngredient = useCreateIngredient();

  const [defaultIngredient, setDefaultIngredient] =
    useState<TRecipeIngredient>();
  const form = useForm<TRecipeIngredient>();

  useImperativeHandle(ref, () => ({
    onOpen: (ingredient?: TRecipeIngredient) => {
      setIsOpen(true);
      setDefaultIngredient(ingredient);

      // setUnities(
      //   ingredient?.isRecipe
      //     ? [ingredient.quantity.type]
      //     : ingredient?.unities?.map((u) => u.valueOf()) ??
      //         ingredients
      //           ?.find((i) => i.id == ingredient?.id)
      //           ?.unities.map((u) => u.valueOf()) ??
      //         []
      // );
      if (ingredient) {
        form.reset(ingredient);
      } else {
        form.reset(DEFAULT_INGREDIENT);
      }
    },
  }));

  async function handleSubmit(ing: TRecipeIngredient) {
    let values = ing;
    if (ingredients?.filter((i) => i.id == values.id).length == 0) {
      // Need to create this new ingredient
      const imageName = lastValueOf(values.image.split("/"));
      if (!imageName) return;

      const newIngredient = await createIngredient(
        values.name,
        imageName,
        values.unities ?? []
      );
      if (newIngredient) values.id = newIngredient?.id;
    }

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

  const isDisabled = isRecipe; /*|| (unities.length ?? 0) == 0*/

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Ingrédient"
      onSubmit={form.handleSubmit(handleSubmit)}
      isSubmitting={form.formState.isSubmitting}
      submitButtonLabel={defaultIngredient ? "Modifier" : "Ajouter"}
    >
      <Form form={form}>
        <RichSelect
          label="Ingrédient"
          isRequired
          mappedIngredients={mappedIngredients}
          //onSubmit={setUnities}
        />
        <Select
          label="Unité"
          placeholder="Aucune unité sélectionée..."
          isRequired
          data={[...(isRecipe ? RECIPE_UNIT_OPTIONS : ingredientsUnitOptions)]} //.filter((u) => unities.includes(parseInt(u.key)))}
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
