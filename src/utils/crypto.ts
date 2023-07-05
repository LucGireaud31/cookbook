export function generateShortUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  return (
    ("000" + firstPart.toString(36)).slice(-3) +
    ("000" + secondPart.toString(36)).slice(-3)
  );
}

export function generateUID() {
  return "CB_" + Math.random().toString(32) + Math.random().toString(32);
}
