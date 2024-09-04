export interface TimelineEvent {
  status: string;
  date: string;
  arrivalTime?: string | null;
  departureTime?: string | null;
  timeDifference: string;
  icon?: string;
  color?: string;
  image?: string;
}
