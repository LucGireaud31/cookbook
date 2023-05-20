import { gql, useMutation, useQuery } from "@apollo/client";
import { IngredientQuantityType, TIngredient } from "../types/ingredients";

export const queryGetIngredients = gql`
  query ingredients {
    ingredients {
      id
      name
      image
      isDefault
      unities
      plural
    }
  }
`;

export function useIngredients() {
  const { data, ...rest } = useQuery<{ ingredients: TIngredient[] }>(
    queryGetIngredients
  );

  return { ...rest, data: data?.ingredients };
}

const mutationCreateIngredient = gql`
  mutation createIngredient(
    $name: String!
    $image: String!
    $unities: [Int!]!
  ) {
    createIngredient(
      ingredient: { name: $name, image: $image, unities: $unities }
    ) {
      id
      name
      image
      isDefault
      unities
      plural
    }
  }
`;

export function useCreateIngredient() {
  const [mutation, { client }] = useMutation<{ createIngredient: TIngredient }>(
    mutationCreateIngredient
  );

  async function onMutate(
    name: string,
    image: string,
    unities: IngredientQuantityType[]
  ) {
    const { data } = await mutation({ variables: { name, image, unities } });

    if (data) {
      client.cache.updateQuery<{ ingredients: TIngredient[] }>(
        { query: queryGetIngredients },
        (ingredients) => {
          return {
            ingredients: [
              ...(ingredients?.ingredients ?? []),
              data.createIngredient,
            ],
          };
        }
      );
    }

    return data?.createIngredient;
  }

  return onMutate;
}
