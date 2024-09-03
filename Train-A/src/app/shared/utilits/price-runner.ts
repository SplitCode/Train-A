import { Segment } from '../../home/models/ride-response.interface';

export const priceRunner = (
  path: number[],
  segments: Segment[],
  startPath: number,
  endPath: number,
  carriageType: string,
): number => {
  const startIndex = path.indexOf(startPath);
  const endIndex = path.indexOf(endPath);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return 0;
  }

  let totalPrice = 0;
  for (let i = startIndex; i < endIndex; i++) {
    const segment = segments[i];
    if (segment.price && segment.price[carriageType]) {
      totalPrice += segment.price[carriageType];
    }
  }

  return totalPrice;
};
