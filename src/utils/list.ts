export function lastValueOf<T>(list?: T[]) {
  if (list && list.length > 0) {
    return list[list.length - 1];
  }
  return null;
}
