import { IngredientQuantityType, TRecipeIngredient } from "./ingredients";
import { TTag } from "./tags";
import { TType } from "./type";

export enum RecipeQuantityTypeEnum {
  Unit = 0,
  Personns = 1,
}

export type TRecipeQuantity = {
  value?: number;
  type?: RecipeQuantityTypeEnum;
};

export type TRecipePagination = {
  page: number;
  pageMax: number;
  recipes: TRecipeItem[];
};

export type TRecipeItem = {
  id: string;
  name: string;
  type?: TType;
  tags: TTag[];
  note: number;
  image: string;
  isFavorite: boolean;
  creationDate: string;
};

export type TRecipe = {
  id: string;
  name: string;
  type?: TType;
  tags: TTag[];
  note: number;
  image?: string;
  isFavorite: boolean;
  ingredients: TRecipeIngredient[];
  recipes: TRecipe[];
  creationDate: string;
  content: string[];
  quantity?: TRecipeQuantity;
  commentary?: string;
};

export type TMiniRecipe = {
  id: string;
  name: string;
  image: string;
  quantity?: TRecipeQuantity;
};

export type TRecipeBody = {
  id: string;
  name: string;
  type?: string | null;
  tags: TRecipeTagBody[];
  note: number;
  image?: string;
  isFavorite: boolean;
  ingredients: TRecipeIngredientBody[];
  recipes: { id: string; quantity: number }[];
  content: string[];
  quantity?: TRecipeQuantity;
};

export type TRecipeForm = {
  id: string;
  name: string;
  type?: string | null;
  tags: string[];
  note: number;
  image?: string | null;
  isFavorite: boolean;
  ingredients: TRecipeIngredientBody[];
  recipes: TRecipeIngredientBody[];
  content: string[];
  quantity?: TRecipeQuantity;
};

export type TRecipeTagBody = {
  id?: string;
  name?: string;
  color?: string;
};

export type TRecipeIngredientBody = {
  id?: string;
  quantity?: QuantityBody;
  name?: string;
  image?: string;
  unities?: number[];
  isRecipe?: boolean;
};

export type QuantityBody = {
  value?: number;
  type?: IngredientQuantityType;
};
