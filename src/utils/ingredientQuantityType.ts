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

export function ingredientsUnitOptions(
  unities: number[]
): { key: string; label: string }[] {
  return unities
    .map((u) => {
      switch (u) {
        case 0:
          return {
            key: IngredientQuantityType.Unit.toString(),
            label: "À l'unité",
          };
        case 1:
          return { key: IngredientQuantityType.Ml.toString(), label: "Ml" };

        case 2:
          return { key: IngredientQuantityType.Cl.toString(), label: "Cl" };
        case 3:
          return {
            key: IngredientQuantityType.Gr.toString(),
            label: "Grammes",
          };
        case 4:
          return {
            key: IngredientQuantityType.CAS.toString(),
            label: "Cuillère à soupe",
          };
        case 5:
          return {
            key: IngredientQuantityType.CAC.toString(),
            label: "Cuillère à café",
          };
        case 6:
          return {
            key: IngredientQuantityType.Pinch.toString(),
            label: "Pincée",
          };
        case 7:
          return {
            key: IngredientQuantityType.Handle.toString(),
            label: "Poignée",
          };
        default:
          return null;
      }
    })
    .filter(Boolean) as any;
}
