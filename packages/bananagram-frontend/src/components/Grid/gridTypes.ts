import { Piece } from '../../types';

export interface SquareData {
  piece?: Piece;
  isSelected: boolean;
}
export interface SquaresData {
  [vectorKey: string]: SquareData;
}

export type GridRow = SquareData[];
export type GridSquares = GridRow[];

export interface SelectedPieces {
  [id: string]: true;
}
