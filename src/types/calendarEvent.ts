export type CalendarEvent = {
  id: string | number;
  title?: string;
  description?: string;
  start: Date;
  end: Date;
  isAllDay?: boolean;
  color?: string;
};
