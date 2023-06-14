export type TShoppingItem = {
  id: string;
  name: string;
  image: string;
  quantity?: number;
  isRecipe?: boolean;
};

export type TShoppingItemBody = {
  name: string;
  image: string;
  quantity?: number;
};

export type TShopingRecipeToAdd = {
  id: string;
};
