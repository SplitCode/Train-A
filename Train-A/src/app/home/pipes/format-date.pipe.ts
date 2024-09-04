import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  pure: false,
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string): string {
    const newDate = new Date(date);

    const setMonth = newDate.toLocaleString('default', {
      month: 'long',
      day: '2-digit',
    });

    return setMonth;
  }
}
