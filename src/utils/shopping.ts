import { ENV } from "../../env";
import { TShoppingItem } from "../types/shopping";
import { getLetterImage } from "./ingredient";
import { normalize } from "./string";

export function formatImageUrlForDatabase(items: TShoppingItem[]) {
  return items.map((item) => ({
    ...item,
    image: item.image.split("/cloud/")[1],
  }));
}

export function getProposalsByName(name: string, items: TShoppingItem[]) {
  const normalizedName = normalize(name);
  const existingItem = items.find((i) => normalize(i.name) == normalizedName);
  if (existingItem) return [];
  const bigNoarmalizedName = normalizedName.replace(/[0-9]/g, "").trim();
  if (bigNoarmalizedName.length < 1) return [];

  return [
    {
      id: "",
      name,
      image: getLetterImage(bigNoarmalizedName[0]), // get first carac
    },
  ];
}
