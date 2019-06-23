import { Vector, createVectorKey } from '../../utils/vector/vector';
import { GridSquares, GridRow, SelectedPieces, SquareData } from './gridTypes';
import { Pieces, Piece } from '../../types';
import memoizee from 'memoizee';

const memoCreateSquareData = memoizee(createSquareData);

export function createSquares(
  pieces: Pieces,
  selectedPieces: SelectedPieces,
  dimensions: Vector
): GridSquares {
  const squares: GridSquares = [];
  for (let rowIndex = 0; rowIndex < dimensions.y; rowIndex++) {
    const row: GridRow = [];
    for (let colIndex = 0; colIndex < dimensions.x; colIndex++) {
      const squareKey = createVectorKey(colIndex, rowIndex);
      const piece = pieces[squareKey] as Piece | undefined;
      const isSelected = Boolean(piece && selectedPieces[piece.id]);
      row.push(memoCreateSquareData(piece, isSelected));
    }
    squares.push(row);
  }
  return squares;
}

function createSquareData(
  piece: Piece | undefined,
  isSelected: boolean
): SquareData {
  return {
    piece,
    isSelected
  };
}
