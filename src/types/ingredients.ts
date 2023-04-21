export enum IngredientQuantityType {
  Unit,
  Ml,
  Cl,
  Gr,
  CAS,
  CAC,
  Pinch,
  Handle,
  Bag,
}

export type TRecipeIngredient = {
  id: string;
  name: string;
  plural: string;
  image: string;
  quantity: {
    type: IngredientQuantityType;
    value: number;
  };
  unities?: IngredientQuantityType[];
  isRecipe: boolean;
};

export type TIngredient = {
  id: string;
  name: string;
  image: string;
  isDefault: boolean;
  unities: IngredientQuantityType[];
};
