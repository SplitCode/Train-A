import { Store } from '@ngrx/store';
import { updateTrainArray } from '../../redux/actions/train.actions';
import { Schedule, Segment } from '../models/ride-response.interface';

export const calculateCarriagePrice = (
  schedule: Schedule,
  carriage: string,
  startSegment: number,
  endSegment: number,
): number => {
  let totalPrice = 0;

  for (let i = startSegment; i <= endSegment; i++) {
    const segment: Segment | undefined = schedule.segments[i];
    if (segment) {
      const price = segment.price[carriage];
      if (typeof price === 'number') {
        totalPrice += price;
      }
    }
  }

  return totalPrice;
};

export const uprateTrain = (
  store: Store,
  carriageCodes: string[] | undefined,
) => {
  if (carriageCodes) {
    const carriagesWithNumbers = carriageCodes.map((code, index) => ({
      code,
      carriageNumber: index + 1,
    }));

    store.dispatch(updateTrainArray({ carriageCodes: carriagesWithNumbers }));
  }
};
