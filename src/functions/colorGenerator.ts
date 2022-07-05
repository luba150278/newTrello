const LOWER_COLOR = 100;
const UPPER_COLOR = 255;
const LOWER_OPACITY = 0.3;
const UPPER_OPACITY = 0.8;

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function colorGenerator(): string {
  const colors: number[] = new Array(3);
  for (let i = 0; i < 3; i++) {
    colors[i] = getRandomInRange(LOWER_COLOR, UPPER_COLOR);
  }
  const a = getRandomFloat(LOWER_OPACITY, UPPER_OPACITY);

  return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${a})`;
}
