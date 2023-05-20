import { IngredientQuantityType } from "../types/ingredients";
import { RecipeQuantityTypeEnum } from "../types/recipe";
import { toPlural } from "./string";

export function formatIngredientQuantityLabel(
  type: IngredientQuantityType | RecipeQuantityTypeEnum,
  value: number,
  isRecipe?: boolean
) {
  const valueStr = value.toString().replace(".", ",");

  if (isRecipe) {
    switch (type) {
      case RecipeQuantityTypeEnum.Personns:
        return valueStr + toPlural(" personne", value);
      default:
        return valueStr.toString().replace(".", ",");
    }
  }

  switch (type) {
    case IngredientQuantityType.CAC:
      return valueStr + " c.à.c";
    case IngredientQuantityType.CAS:
      return valueStr + " c.à.s";
    case IngredientQuantityType.Cl:
      return valueStr + " cl";
    case IngredientQuantityType.Ml:
      return valueStr + " ml";
    case IngredientQuantityType.Gr:
      return valueStr + " gr";
    case IngredientQuantityType.Handle:
      return valueStr + toPlural(" poingée", value);
    case IngredientQuantityType.Pinch:
      return valueStr + toPlural(" pincée", value);
    case IngredientQuantityType.Bag:
      return valueStr + toPlural(" sachet", value);
    case IngredientQuantityType.Glass:
      return valueStr + toPlural(" verre", value);
    default:
      return valueStr.toString();
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
  { key: IngredientQuantityType.Bag.toString(), label: "Sachet" },
  { key: IngredientQuantityType.Glass.toString(), label: "Verre" },
];
