// Friendship and Conversation are undirected — both store userAId/userBId
// with the lexicographically smaller id always in the "A" slot, so a pair
// has exactly one canonical row no matter who initiated it.
export function orderPair(idOne, idTwo) {
  return idOne < idTwo ? [idOne, idTwo] : [idTwo, idOne];
}
