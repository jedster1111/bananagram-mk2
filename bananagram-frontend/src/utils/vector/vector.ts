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

export const addVectors = (a: Vector, b: Vector): Vector =>
  createVector(a.x + b.x, a.y + b.y);

export const areVectorsEqual = (a: Vector, b: Vector): boolean =>
  a.x === b.x && a.y === b.y;

export const isVectorSmallerThan = (
  vectorToCheck: Vector,
  vectorToCompare: Vector
): boolean =>
  vectorToCheck.x <= vectorToCompare.x || vectorToCheck.y <= vectorToCompare.y;

export const getVectorArea = ({ x, y }: Vector): number => x * y;
