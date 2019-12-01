import {
  numberOfBananagramTokens,
  numberOfChessTokens,
  numberOfDeckOfCardsTokens,
  numberOfWildBananagramTokens,
  numberOfWildDeckOfCardsTokens,
} from './types';
import { tokensGenerator } from './token';
import { insideOutShuffle } from './shuffle';

describe('token module ', function() {
  const bgTokens = insideOutShuffle(tokensGenerator(numberOfBananagramTokens));
  const bgwTokens = insideOutShuffle(
    tokensGenerator(numberOfWildBananagramTokens)
  );
  const dcTokens = insideOutShuffle(tokensGenerator(numberOfDeckOfCardsTokens));
  const dcwTokens = insideOutShuffle(
    tokensGenerator(numberOfWildDeckOfCardsTokens)
  );
  const chessTokens = [...tokensGenerator(numberOfChessTokens)];

  it('bgTokens should have 144 bgTokens shuffled', () => {
    expect(bgTokens).toHaveLength(144);
  });

  it('bgwTokens should have 150 bgwTokens shuffled', () => {
    expect(bgwTokens).toHaveLength(150);
  });

  it('dcTokens should have 52 dcTokens shuffled', () => {
    expect(dcTokens).toHaveLength(52);
  });

  it('dcdTokens should have 52 + two wild cards dcwTokens shuffled', () => {
    expect(dcwTokens).toHaveLength(54);
  });

  it('chessTokens should have 32 chessTokens not shuffled', () => {
    expect(chessTokens).toHaveLength(32);
  });
});
