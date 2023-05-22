import { TShoppingItem } from "../types/shopping";

export function formatImageUrlForDatabase(items: TShoppingItem[]) {
  return items.map((item) => ({
    ...item,
    image: item.image.split("/cloud/")[1],
  }));
}
