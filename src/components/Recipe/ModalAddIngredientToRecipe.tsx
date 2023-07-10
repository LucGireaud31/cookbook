import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
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
import { sleep } from "../../utils/promise";
import { Toast } from "react-native-toast-message/lib/src/Toast";

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
  const [defaultSearch, setDefaultSearch] = useState<string>();

  const searchRef = useRef<TextInput>(null);

  const { data: ingredients } = useIngredients();
  const createIngredient = useCreateIngredient();

  const [defaultIngredient, setDefaultIngredient] =
    useState<TRecipeIngredient>();
  const form = useForm<TRecipeIngredient>();

  useImperativeHandle(ref, () => ({
    onOpen: async (ingredient?: TRecipeIngredient) => {
      setIsOpen(true);
      setDefaultIngredient(ingredient);
      setDefaultSearch(ingredient?.name ?? "");

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

        await sleep(100);
        searchRef.current?.focus();
      }
    },
  }));

  async function handleSubmit(ing: TRecipeIngredient, closeOnEnd?: boolean) {
    let values = ing;
    if (
      !ing.isRecipe &&
      ingredients?.filter((i) => i.id == values.id).length == 0
    ) {
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

    if (closeOnEnd) {
      setIsOpen(false);
    } else {
      form.reset(DEFAULT_INGREDIENT);
      setDefaultSearch(undefined);

      searchRef.current?.focus();

      setDefaultSearch("");
    }
  }

  const isRecipe = form.getValues("isRecipe");

  const isDisabled = isRecipe; /*|| (unities.length ?? 0) == 0*/

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Ingrédient"
      onButton2Press={form.handleSubmit((data) => handleSubmit(data, true))}
      isSubmitting={form.formState.isSubmitting}
      {...(defaultIngredient
        ? {
            button2Label: "Modifier",
          }
        : {
            submitButtonLabel: "Ajouter et continuer",
            button2Label: "Ajouter et fermer",
            onSubmit: form.handleSubmit((data) => handleSubmit(data, false)),
            fontSizeButtons: 12,
          })}
    >
      <Form form={form}>
        <RichSelect
          inputRef={searchRef}
          label="Ingrédient"
          isRequired
          mappedIngredients={mappedIngredients}
          defaultSearch={defaultSearch}
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
