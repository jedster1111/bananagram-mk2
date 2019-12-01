export function insideOutShuffle<T>(iterator: IterableIterator<T> | T[]): T[] {
  const result: T[] = [];
  let i = 0;

  for (const value of iterator) {
    const j = Math.floor(Math.random() * i);
    result[i] = result[j];
    result[j] = value;
    i++;
  }

  return result;
}
