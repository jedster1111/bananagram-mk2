import { NumberOfTokens, TokenData } from './types';

export function* tokensGenerator<T extends string>(
  numberOfTokens: NumberOfTokens<T>
): IterableIterator<TokenData<T>> {
  let id = 0;
  for (const key in numberOfTokens) {
    const token: T = key as T;
    for (let i = 0; i < numberOfTokens[token]; i++) {
      const tokenData: TokenData<T> = { id, token };
      yield tokenData;
      id++;
    }
  }
}
