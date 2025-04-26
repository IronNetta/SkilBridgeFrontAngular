export interface Availability {
  id: number;
  startTime: string;
  endTime: string;
  status?: 'AVAILABLE' | 'BOOKED';
}
