export interface Vector {
  x: number;
  y: number;
}

export const createVector = (x: number, y: number): Vector => ({ x, y });

export const vectorToString = ({ x, y }: Vector): string => `${x}-${y}`;

/**
 * @param str A string in the format ${x}-${y}
 */
export const stringToVector = (str: string): Vector => {
  const [x, y] = str.split('-');
  const noX = Number(x);
  const noY = Number(y);

  if (isNaN(noX) || isNaN(noY)) {
    throw new Error(`${str} does not match format ${x}-${y}`);
  }

  return createVector(noX, noY);
};
