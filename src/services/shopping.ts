import { gql, useQuery } from "@apollo/client";
import { TShoppingItem } from "../types/shopping";

// ---------------------- //
// --Get Shopping items-- //
// ---------------------- //

const mqueryGetShoppingItems = gql`
  query shoppingItems {
    shoppingItems {
      id
      image
      name
    }
  }
`;

export function useShoppingItems() {
  try {
    const { data } = useQuery<{ shoppingItems: TShoppingItem[] }>(
      mqueryGetShoppingItems
    );
    return data?.shoppingItems ?? null;
  } catch {
    return null;
  }
}
