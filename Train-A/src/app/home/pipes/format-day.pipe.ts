import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDay',
  pure: false,
  standalone: true,
})
export class FormatDayPipe implements PipeTransform {
  transform(date: string): string {
    const newDate = new Date(date);
    const setDay = newDate.toLocaleString('default', { weekday: 'long' });

    return setDay;
  }
}
