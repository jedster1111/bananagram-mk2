type BanangramTokens = 'a' | 'b' | 'c';
type WildBananagramTokens = BanangramTokens | '*';
type ChessTokens = 'K' | 'Q' | 'p';

type NumberOfTokensMap<Tokens extends string> = {
  [key in Tokens]: number;
};

export const numberOfBanangramTokens: NumberOfTokensMap<BanangramTokens> = {
  a: 1,
  b: 5,
  c: 6,
};

export const wildNoOfBanangramTokens: NumberOfTokensMap<WildBananagramTokens> = {
  ...numberOfBanangramTokens,
  '*': 3,
};

type keyOfTest = keyof typeof wildNoOfBanangramTokens;

export function createPieces<Tokens extends string>(
  numberOfPieces: NumberOfTokensMap<Tokens>
): string[] {
  const result = Object.entries(numberOfPieces).reduce<string[]>(
    (accum, [token, noOfTokens]) => {
      if (typeof noOfTokens !== 'number') {
        return accum;
      }

      for (let i = 0; i < noOfTokens; i++) {
        accum.push(token);
      }

      return accum;
    },
    []
  );

  return result;
}

// const testing = {
//   a: 'apple',
//   b: 'banana',
// };

// const entriesExample = Object.entries(testing);

export const numberOfChessPieces: NumberOfTokensMap<ChessTokens> = {
  K: 2,
  Q: 2,
  p: 10,
};
