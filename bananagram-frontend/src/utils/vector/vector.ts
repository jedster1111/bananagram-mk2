export interface Vector {
  x: number;
  y: number;
}

export const createVector = (x: number, y: number): Vector => ({ x, y });

export const createVectorKey = (x: number, y: number): string => `${x}-${y}`;
export const vectorToKey = ({ x, y }: Vector): string => `${x}-${y}`;
export const keyToVector = (str: string): Vector => {
  const [x, y] = str.split('-');
  const noX = Number(x);
  const noY = Number(y);
  if (isNaN(noX) || isNaN(noY)) {
    throw new Error(`${str} does not match format ${x}-${y}`);
  }
  return createVector(noX, noY);
};
