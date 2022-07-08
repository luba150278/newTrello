export function isValidTitle(title: string): boolean {
  if (title.match(/^[\d\p{L} .,_-]+$/u) === null) {
    return false;
  }
  return true;
}
