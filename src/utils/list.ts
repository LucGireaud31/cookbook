export function lastValueOf<T>(list?: T[]) {
  if (list && list.length > 0) {
    return list[list.length - 1];
  }
  return null;
}

export function lastValuesOf<T>(list: T[], count: number) {
  if (count && list.length >= count)
    return list.slice(Math.max(list.length - count, 1));

  return list;
}
