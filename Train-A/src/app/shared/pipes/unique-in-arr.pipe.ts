import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueInArr',
  standalone: true,
})
export class UniqueInArrPipe implements PipeTransform {
  transform<T>(value: T[]): T[] {
    if (!Array.isArray(value)) {
      return value;
    }
    return Array.from(new Set(value));
  }
}
