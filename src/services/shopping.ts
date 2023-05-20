import { gql, useMutation, useQuery } from "@apollo/client";
import { TShoppingItem } from "../types/shopping";

// ---------------------- //
// --Get Shopping items-- //
// ---------------------- //

const mutationGetShoppingItems = gql`
  mutation shoppingItems($search: String!) {
    shoppingItems(search: $search) {
      id
      image
      name
    }
  }
`;

export function useShoppingItems() {
  const [mutate] = useMutation<{ shoppingItems: TShoppingItem[] }>(
    mutationGetShoppingItems
  );

  async function mutation(search: string) {
    try {
      const { data } = await mutate({ variables: { search } });

      return data?.shoppingItems ?? null;
    } catch (err) {
      return null;
    }
  }

  return mutation;
}
