import { gql, useMutation, useQuery } from "@apollo/client";
import { TShoppingItem } from "../types/shopping";

// ---------------------- //
// --Get Shopping items-- //
// ---------------------- //

const queryGetShoppingItems = gql`
  query shoppingItems {
    shoppingItems {
      id
      image
      name
    }
  }
`;

export function useShoppingItems() {
  const { data, ...rest } = useQuery<{ shoppingItems: TShoppingItem[] }>(
    queryGetShoppingItems
  );
  return {
    data: data?.shoppingItems ?? null,
    query: queryGetShoppingItems,
    ...rest,
  };
}

// ---------------------- //
// --Add Shopping items-- //
// ---------------------- //

const mutationAddShoppingItems = gql`
  mutation addShoppingItems($items: [ShoppingItemBody!]!) {
    addToShoppingList(items: $items) {
      id
      image
      name
      quantity
    }
  }
`;

export function useAddShoppingItems() {
  const [mutation, { client }] = useMutation<{
    addToShoppingList: TShoppingItem[];
  }>(mutationAddShoppingItems);

  async function mutate(items: TShoppingItem[]) {
    const { data } = await mutation({ variables: { items } });
  }

  return mutate;
}
