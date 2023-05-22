import { gql, useMutation, useQuery } from "@apollo/client";
import { ENV } from "../../env";
import { TShoppingItem } from "../types/shopping";
import { removeFieldInObject } from "../utils/object";

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

// ------------------------------ //
// --Add Shopping items in list-- //
// ------------------------------ //

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
    // Remove typename
    removeFieldInObject({
      obj: items,
      key: "__typename",
      recursively: true,
    });

    let potentialItems: TShoppingItem[] | null = null;

    client.cache.updateQuery(
      {
        query: queryGetShoppingList,
      },
      (
        currentList: { shoppingList: TShoppingItem[] } | null
      ): { shoppingList: TShoppingItem[] } | null => {
        if (currentList) {
          potentialItems = [
            ...currentList.shoppingList,
            ...items.map((i) => ({
              ...i,
              quantity: i.quantity ?? 1,
              image: ENV.API.UPLOADURL + "/" + i.image,
            })),
          ].sort((a, b) => a.name.localeCompare(b.name));

          return {
            shoppingList: potentialItems,
          };
        }
        return currentList;
      }
    );

    const { data } = await mutation({ variables: { items } });

    const myNewList = data?.addToShoppingList;
    if (
      myNewList &&
      (!potentialItems ||
        JSON.stringify(myNewList?.map((i) => i.name)) !=
          JSON.stringify(
            (potentialItems as TShoppingItem[]).map((i) => i.name)
          ))
    ) {
      client.cache.updateQuery(
        {
          query: queryGetShoppingList,
        },
        (): { shoppingList: TShoppingItem[] } | null => {
          return { shoppingList: myNewList };
        }
      );
    }
  }

  return mutate;
}

// --------------------------------- //
// --Remove Shopping items in list-- //
// --------------------------------- //

const mutationRemoveShoppingItem = gql`
  mutation removeShoppingItem($id: String!) {
    removeToShoppingList(id: $id) {
      id
      image
      name
      quantity
    }
  }
`;

export function useRemoveShoppingItem() {
  const [mutation, { client }] = useMutation<{
    removeToShoppingList: TShoppingItem[];
  }>(mutationRemoveShoppingItem);

  async function mutate(id: string) {
    let potentialItems: TShoppingItem[] | null = null;

    client.cache.updateQuery(
      {
        query: queryGetShoppingList,
      },
      (
        currentList: { shoppingList: TShoppingItem[] } | null
      ): { shoppingList: TShoppingItem[] } | null => {
        if (currentList) {
          potentialItems = currentList.shoppingList.filter((i) => i.id != id);

          return {
            shoppingList: potentialItems,
          };
        }
        return currentList;
      }
    );

    const { data } = await mutation({ variables: { id } });

    const myNewList = data?.removeToShoppingList;

    if (
      myNewList &&
      (!potentialItems ||
        JSON.stringify(myNewList?.map((i) => i.name)) !=
          JSON.stringify(
            (potentialItems as TShoppingItem[]).map((i) => i.name)
          ))
    ) {
      client.cache.updateQuery(
        {
          query: queryGetShoppingList,
        },
        (): { shoppingList: TShoppingItem[] } | null => {
          return { shoppingList: myNewList };
        }
      );
    }
  }

  return mutate;
}

// ------------------------ //
// --Get my shopping list-- //
// ------------------------ //

const queryGetShoppingList = gql`
  query getMyShoppingList {
    shoppingList {
      id
      image
      name
      quantity
    }
  }
`;

export function useMyShoppingList() {
  const { data, ...rest } = useQuery<{
    shoppingList: TShoppingItem[];
  }>(queryGetShoppingList);

  return {
    data: data?.shoppingList ?? [],
    query: queryGetShoppingList,
    ...rest,
  };
}
