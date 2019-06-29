export function getSquareIndex(
  x: number,
  y: number,
  dimensionX: number
): number {
  return y * dimensionX + x;
}
