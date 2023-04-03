export function toPlural(name: string, quantity?: number) {
  return (quantity ?? 0) > 1 ? name + "s" : name;
}

export function wrapText(content: string = "", maxChar: number) {
  return content.length > maxChar
    ? content.substring(0, maxChar - 3) + "..."
    : content;
}

export function getLastOfSeparatedString(value: string, separator?: "/") {
  const splitted = value.split("/");
  return splitted.length > 0 ? splitted[splitted.length - 1] : value;
}

export function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .replaceAll("é", "e")
    .replaceAll("è", "e")
    .replaceAll("à", "a")
    .replaceAll("ô", "o")
    .replaceAll("ù", "u")
    .replaceAll("â", "a");
}
