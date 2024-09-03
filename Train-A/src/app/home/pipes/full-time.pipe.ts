import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullTime',
  pure: false,
  standalone: true,
})
export class FullTimePipe implements PipeTransform {
  transform(time: string[]): string {
    if (!time[0] && !time[1]) return 'No time';
    const start = new Date(time[0]).toISOString();
    const end = new Date(time[1]).toISOString();

    const differenceInMilliseconds =
      new Date(end).getTime() - new Date(start).getTime();

    const totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    const daysString = days > 0 ? `${days}d ` : '';
    const hoursString = hours > 0 ? `${hours}h ` : '';
    const minutesString = minutes > 0 ? `${minutes}m` : '';

    return `${daysString}${hoursString}${minutesString}`.trim();
  }
}
