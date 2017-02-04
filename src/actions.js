// Actions

export const MOVE_PAWN = 'MOVE_PAWN';

// Action Creators

export function movePawn(position) {
  return { type: MOVE_PAWN, position }
}