import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTime',
  pure: false,
  standalone: true,
})
export class GetTimePipe implements PipeTransform {
  transform(time: string): string {
    if (!time) return 'Invalid';

    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();

    return `${hours}:${minutes}`;
  }
}
