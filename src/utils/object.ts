export function removeFieldInObject({
  obj,
  key,
  recursively,
}: {
  obj: any;
  key: string;
  recursively?: boolean;
  isFirst?: boolean;
}) {
  for (const prop in obj) {
    if (prop === key) delete obj[prop];
    else if (typeof obj[prop] === "object")
      recursively && removeFieldInObject({ obj: obj[prop], key, recursively });
  }
}
