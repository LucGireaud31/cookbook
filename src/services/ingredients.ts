import { gql, useQuery } from "@apollo/client";
import { TIngredient } from "../types/ingredients";

const queryGetIngredients = gql`
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
