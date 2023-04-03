export function roundNumber(value: number, decimals: number) {
  const pow10 = 10 ** decimals;
  return Math.round(value * pow10) / pow10;
}

export function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
