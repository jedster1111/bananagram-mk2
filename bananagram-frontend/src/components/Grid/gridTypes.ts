import { Vector } from '../../utils/Vector';
import { Piece } from '../../types';

export interface GridPiece extends Partial<Piece> {
  isSelected: boolean;
}
export interface GridPieces {
  [vectorKey: string]: GridPiece;
}
export interface GridProps {
  dimensions: Vector;
  pieces: GridPieces;
  offset: Vector;
}
export type GridRow = GridPiece[];
export type GridSquares = GridRow[];
