export interface TokenData<T> {
  id: number;
  token: T;
}

export type NumberOfTokens<T extends string> = Record<T, number>;

type BananagramTokens =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';
type WildBananagramTokens = BananagramTokens | '*';

export const numberOfBananagramTokens: NumberOfTokens<BananagramTokens> = {
  a: 13,
  b: 3,
  c: 3,
  d: 6,
  e: 18,
  f: 3,
  g: 4,
  h: 3,
  i: 12,
  j: 2,
  k: 2,
  l: 5,
  m: 3,
  n: 8,
  o: 11,
  p: 3,
  q: 2,
  r: 9,
  s: 6,
  t: 9,
  u: 6,
  v: 3,
  w: 3,
  x: 2,
  y: 3,
  z: 2,
};

export const numberOfWildBananagramTokens: NumberOfTokens<WildBananagramTokens> = {
  ...numberOfBananagramTokens,
  '*': 6,
};

type ChessTokens = 'K' | 'Q' | 'R' | 'N' | 'B' | 'P';
export const numberOfChessTokens: NumberOfTokens<ChessTokens> = {
  K: 2,
  Q: 2,
  R: 4,
  N: 4,
  B: 4,
  P: 16,
};

type DeckOfCardsTokens =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';
type WildDeckOfCardsTokens = DeckOfCardsTokens | 'D';

export const numberOfDeckOfCardsTokens: NumberOfTokens<DeckOfCardsTokens> = {
  1: 4,
  2: 4,
  3: 4,
  4: 4,
  5: 4,
  6: 4,
  7: 4,
  8: 4,
  9: 4,
  J: 4,
  Q: 4,
  K: 4,
  A: 4,
};

export const numberOfWildDeckOfCardsTokens: NumberOfTokens<WildDeckOfCardsTokens> = {
  ...numberOfDeckOfCardsTokens,
  D: 2,
};
