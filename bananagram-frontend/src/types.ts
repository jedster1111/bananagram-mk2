import { ReactNode } from 'react';

/**
 * Keyed with ${x}-${y}
 */
export interface Pieces {
  [vectorString: string]: Piece | undefined;
}

export interface Piece {
  value: ReactNode;
}
