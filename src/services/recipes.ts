import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import {
  TMiniRecipe,
  TRecipe,
  TRecipeBody,
  TRecipePagination,
} from "../types/recipe";
import { removeFieldInObject } from "../utils/object";

import axios from "axios";
import { ENV } from "../../env";
import { getTokenLocalStorage } from "./asyncStorage";
import Toast from "react-native-toast-message";

// -------------- //
// ---Recipes--- -//
// -------------- //

const queryGetRecipes = gql`
  query data($page: Int!, $limit: Int!, $filter: RecipeFilterBody) {
    recipes(pagination: { page: $page, limit: $limit }, filter: $filter) {
      page
      pageMax
      recipes {
        id
        name
        image
        type {
          name
          image
        }
        tags {
          name
          color
        }
        note
        isFavorite
        creationDate
      }
    }
  }
`;

type TUserRecipes = {
  recipes: TRecipePagination;
};
export interface FilterProps {
  tags?: string[];
  types?: string[];
  ingredients?: string[];
  minNote?: number;
  isFavorite?: boolean;
  search?: string;
}

export function useRecipesPagination() {
  const { data, ...rest } = useQuery<TUserRecipes>(queryGetRecipes);

  return { data: data?.recipes, query: queryGetRecipes, ...rest };
}

// -------------------- //
// ---Delete Recipe---- //
// -------------------- //

const queryDeleteRecipe = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id)
  }
`;

export function useDeleteRecipe() {
  const [mutation, { client }] = useMutation(queryDeleteRecipe);

  async function deleteRecipe(id: string) {
    await mutation({ variables: { id } });

    client.refetchQueries({ include: [queryGetRecipes, queryGetMiniRecipes] });
  }

  return deleteRecipe;
}

// -------------- //
// ---Recipe--- -//
// -------------- //

const queryGetRecipe = gql`
  query recipe($id: String!) {
    recipe(id: $id) {
      id
      name
      image
      type {
        id
        name
        image
      }
      quantity {
        type
        value
      }
      ingredients {
        id
        name
        plural
        image
        quantity {
          value
          type
        }
        unities
      }
      recipes {
        id
        name
        image
        quantity {
          value
          type
        }
      }

      tags {
        id
        name
        color
      }
      content
      note
      isFavorite
      creationDate
      commentary
    }
  }
`;

type TUserRecipe = {
  recipe: TRecipe;
};

export function useRecipe(id: string) {
  const { data, ...rest } = useQuery<TUserRecipe>(queryGetRecipe, {
    variables: { id },
  });
  return { data: data?.recipe, query: queryGetRecipe, ...rest };
}

// ----------------- //
// --Create Recipe-- //
// ----------------- //

const mutationCreateRecipe = gql`
  mutation createRecipe(
    $name: String!
    $type: String
    $tags: [RecipeTagBody!]!
    $ingredients: [RecipeIngredientBody!]!
    $content: [String!]!
    $quantity: QuantityBody
    $note: Int
    $image: String
    $isFavorite: Boolean
    $recipes: [RecipeDependenceBody!]!
  ) {
    createRecipe(
      recipe: {
        name: $name
        typeId: $type
        tags: $tags
        ingredients: $ingredients
        content: $content
        quantity: $quantity
        note: $note
        image: $image
        isFavorite: $isFavorite
        recipes: $recipes
      }
    ) {
      id
      name
      image
      type {
        id
        name
        image
      }
      quantity {
        type
        value
      }
      ingredients {
        id
        name
        plural
        image
        quantity {
          value
          type
        }
        unities
      }
      recipes {
        id
        name
        image
        quantity {
          type
          value
        }
      }
      tags {
        id
        name
        color
      }
      content
      note
      isFavorite
      creationDate
      commentary
    }
  }
`;

export function useCreateRecipe() {
  const [mutation, { client }] = useMutation<{ createRecipe: TRecipe }>(
    mutationCreateRecipe
  );

  async function onMutate(body: TRecipeBody) {
    removeFieldInObject({
      obj: body,
      key: "__typename",
      recursively: true,
    });

    const { data, errors } = await mutation({
      variables: body,
    });

    client.cache.updateQuery(
      {
        query: queryGetRecipe,
        variables: { id: data?.createRecipe.id },
      },
      (props: any): TUserRecipe | null => {
        return data?.createRecipe ? { recipe: data.createRecipe } : null;
      }
    );

    client.refetchQueries({
      include: [queryGetRecipes, queryGetMiniRecipes],
    });

    return data?.createRecipe ?? null;
  }

  return onMutate;
}
// ----------------- //
// --Update Recipe-- //
// ----------------- //

const mutationUpdateRecipe = gql`
  mutation updateRecipe(
    $id: String!
    $name: String!
    $type: String
    $tags: [RecipeTagBody!]!
    $ingredients: [RecipeIngredientBody!]!
    $content: [String!]!
    $quantity: QuantityBody
    $note: Int
    $image: String
    $isFavorite: Boolean
    $recipes: [RecipeDependenceBody!]!
  ) {
    updateRecipe(
      id: $id
      recipe: {
        name: $name
        typeId: $type
        tags: $tags
        ingredients: $ingredients
        content: $content
        quantity: $quantity
        note: $note
        image: $image
        isFavorite: $isFavorite
        recipes: $recipes
      }
    ) {
      id
      name
      image
      type {
        id
        name
        image
      }
      quantity {
        type
        value
      }
      ingredients {
        id
        name
        plural
        image
        quantity {
          value
          type
        }
        unities
      }
      recipes {
        id
        name
        image
        quantity {
          type
          value
        }
      }
      tags {
        id
        name
        color
      }
      content
      note
      isFavorite
      creationDate
      commentary
    }
  }
`;

export function useUpdateRecipe() {
  const [mutation, { client }] = useMutation<{ updateRecipe: TRecipe }>(
    mutationUpdateRecipe
  );

  async function onMutate(id: string, body: TRecipeBody) {
    removeFieldInObject({
      obj: body,
      key: "__typename",
      recursively: true,
    });

    const { data, errors } = await mutation({
      variables: { ...body, id },
    });

    client.cache.updateQuery(
      {
        query: queryGetRecipe,
        variables: { id },
      },
      (): TUserRecipe | null => {
        return data?.updateRecipe ? { recipe: data.updateRecipe } : null;
      }
    );

    client.refetchQueries({
      include: [queryGetRecipes, queryGetMiniRecipes],
    });
  }

  return onMutate;
}

// -------------- //
// ---Favorite--- //
// -------------- //

const mutationToggleFavorite = gql`
  mutation toggleFavorite($id: String!, $isFavorite: Boolean!) {
    toggleRecipeFavorite(id: $id, isFavorite: $isFavorite)
  }
`;

export function useToggleRecipeFavorite() {
  const [mutation, { client }] = useMutation(mutationToggleFavorite);

  async function onMutate(id: string, isFavorite: boolean) {
    await mutation({ variables: { id, isFavorite } });

    client.refetchQueries({
      include: [queryGetRecipes],
    });
  }

  return onMutate;
}

// -------------- //
// -----Note----- //
// -------------- //

const mutationToggleNote = gql`
  mutation toggleNote($id: String!, $note: Int!) {
    toggleRecipeNote(id: $id, note: $note)
  }
`;
export function useToggleRecipeNote() {
  const [mutation, { client }] = useMutation(mutationToggleNote);

  async function onMutate(id: string, note: number) {
    await mutation({ variables: { id, note } });
    client.cache.updateQuery(
      {
        query: queryGetRecipe,
        variables: {
          id,
        },
      },
      (data) => (data ? { ...data, note } : null)
    );

    client.refetchQueries({
      include: [queryGetRecipes],
    });
  }

  return onMutate;
}

// -------------- //
// -----Mini----- //
// -------------- //

export const queryGetMiniRecipes = gql`
  query allRecipes {
    recipes(pagination: null, filter: null) {
      recipes {
        id
        name
        image
        quantity {
          type
          value
        }
      }
    }
  }
`;
export function useAllMiniRecipes() {
  const { data, ...rest } = useQuery<{ recipes: { recipes: TMiniRecipe[] } }>(
    queryGetMiniRecipes
  );

  return { ...rest, data: data?.recipes.recipes ?? null };
}

// ----------------- //
// -----Comment----- //
// ----------------- //

const mutationSetCommentary = gql`
  mutation setCommentary($id: String!, $commentary: String!) {
    setCommentary(id: $id, commentary: $commentary)
  }
`;
export function useSetCommentary() {
  const [mutation, { client }] = useMutation(mutationSetCommentary);

  async function setCommentary(id: string, commentary: string) {
    await mutation({
      variables: {
        id,
        commentary,
      },
    });
    client.cache.updateQuery<TUserRecipe>(
      { query: queryGetRecipe, variables: { id } },
      (oldRecipe) => {
        if (!oldRecipe) return null;
        return { recipe: { ...oldRecipe?.recipe, commentary } };
      }
    );
  }

  return setCommentary;
}

// ---------- //
// --Upload-- //
// ---------- //

export async function uploadRecipeImage(uri: string) {
  const token = await getTokenLocalStorage();
  if (!token) return null;

  const name = uri.split("/").pop() ?? "";

  const match = /\.(\w+)$/.exec(name);
  const type = match ? `image/${match[1]}` : `image`;

  const formData = new FormData();
  formData.append("file", { uri, name, type } as any);

  const { data, status } = await axios.post(
    ENV.API.UPLOADURL + `/upload-recipe`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return status == 200 ? data : null;
}

// -------------------- //
// --Duplicate recipe-- //
// -------------------- //

const mutationDuplicateRecipe = gql`
  mutation duplicateRecipe($id: String!) {
    duplicateRecipe(id: $id) {
      id
    }
  }
`;

export function useDuplicateRecipe() {
  const [mutate, { client }] = useMutation<{ duplicateRecipe: { id: string } }>(
    mutationDuplicateRecipe
  );

  async function mutation(id: string) {
    try {
      const { data } = await mutate({ variables: { id } });

      if (data?.duplicateRecipe) {
        client.refetchQueries({ include: [queryGetRecipes] });
      }
    } catch (err) {
      Toast.show({
        text1: "Une erreur est survenue",
        text2: (err as ApolloError).message,
        type: "error",
      });
    }
  }

  return mutation;
}
