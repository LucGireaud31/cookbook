import { ENV } from "../../env";
import { normalize } from "./string";

export function generatePdfUri(id: string, name: string) {
  return `${ENV.API.PDFURL}/recipes/${id}/${normalize(
    name.replaceAll(" ", "%20")
  )}`;
}
