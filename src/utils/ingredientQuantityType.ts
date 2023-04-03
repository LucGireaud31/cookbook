import { IngredientQuantityType } from "../types/ingredients";
import { RecipeQuantityTypeEnum } from "../types/recipe";
import { toPlural } from "./string";

export function formatIngredientQuantityLabel(
  type: IngredientQuantityType | RecipeQuantityTypeEnum,
  value: number,
  isRecipe?: boolean
) {
  if (isRecipe) {
    switch (type) {
      case RecipeQuantityTypeEnum.Personns:
        return value + toPlural(" personne", value);
      default:
        return value;
    }
  }

  switch (type) {
    case IngredientQuantityType.CAC:
      return value + " c.à.c";
    case IngredientQuantityType.CAS:
      return value + " c.à.s";
    case IngredientQuantityType.Cl:
      return value + " cl";
    case IngredientQuantityType.Ml:
      return value + " ml";
    case IngredientQuantityType.Gr:
      return value + " gr";
    case IngredientQuantityType.Handle:
      return value + toPlural(" poingée", value);
    case IngredientQuantityType.Pinch:
      return value + toPlural(" pincée", value);
    default:
      return value;
  }
}

export function formatIngredientName(
  name: string,
  plural: string,
  type?: IngredientQuantityType | RecipeQuantityTypeEnum,
  value?: number,
  isRecipe?: boolean
) {
  if (isRecipe) {
    return name;
  }
  switch (type) {
    case IngredientQuantityType.Unit:
      return (value ?? 0) >= 2 ? plural : name;
    default:
      return name;
  }
}

export const ingredientsUnitOptions = [
  { key: IngredientQuantityType.Gr.toString(), label: "Grammes" },
  { key: IngredientQuantityType.Unit.toString(), label: "À l'unité" },
  { key: IngredientQuantityType.Ml.toString(), label: "Ml" },
  { key: IngredientQuantityType.Cl.toString(), label: "Cl" },
  { key: IngredientQuantityType.Pinch.toString(), label: "Pincée" },
  { key: IngredientQuantityType.Handle.toString(), label: "Poignée" },
  { key: IngredientQuantityType.CAC.toString(), label: "Cuillère à café" },
  { key: IngredientQuantityType.CAS.toString(), label: "Cuillère à soupe" },
];
