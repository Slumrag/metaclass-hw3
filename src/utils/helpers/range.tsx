export function range(start: number, end?: number): number[] {
  const arr: number[] = [];
  if (end !== undefined && start > end) {
    return arr;
  }
  const rangeStart = end !== undefined ? start : 0;
  const rangeEnd = end ?? start;
  for (let index = rangeStart; index <= rangeEnd; index++) {
    arr.push(index);
  }
  return arr;
}
