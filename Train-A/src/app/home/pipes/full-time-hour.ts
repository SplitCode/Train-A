import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullTimeHour',
  pure: false,
  standalone: true,
})
export class FullTimeHourPipe implements PipeTransform {
  transform(time: string[]): string {
    if (!time[0] || !time[1]) return 'No time';

    const start = new Date(time[0]);
    const end = new Date(time[1]);

    const differenceInMilliseconds = end.getTime() - start.getTime();
    const totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hoursString = totalHours > 0 ? `${totalHours} h` : '';
    const minutesString = minutes > 0 ? `${minutes} m` : '';

    return [hoursString, minutesString].filter(Boolean).join(' ');
  }
}
