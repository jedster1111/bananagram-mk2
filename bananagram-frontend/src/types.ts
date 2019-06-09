import { ReactNode } from 'react';

/**
 * Keyed with ${x}-${y}
 */
export interface Pieces {
  [vectorString: string]: Piece | undefined;
}

interface Piece {
  value: ReactNode;
}
