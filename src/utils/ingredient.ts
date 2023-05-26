import { ENV } from "../../env";

export function getLetterImage(name: string) {
  return `${ENV.API.UPLOADURL}/ingredients/${name}.png`;
}
