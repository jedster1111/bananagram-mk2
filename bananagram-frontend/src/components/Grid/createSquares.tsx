import { Vector, createVectorKey } from '../../utils/vector/vector';
import { GridSquares, GridRow, SelectedPieces } from './gridTypes';
import { Pieces, Piece } from '../../types';

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
      row.push({
        piece,
        isSelected: Boolean(piece && selectedPieces[piece.id])
      });
    }
    squares.push(row);
  }
  return squares;
}
