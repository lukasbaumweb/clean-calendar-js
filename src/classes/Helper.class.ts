import { CalendarEvent } from './../types/calendarEvent';

export class Helper {
  static daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  static isToday = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  static getWeekNumber = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
  };

  static isInBetween = (d: Date, start: Date, end: Date) => {
    const isInRange = d.getTime() > start.getTime() && d.getTime() < end.getTime();
    const isToday =
      (d.getDate() == start.getDate() && d.getMonth() == start.getDate()) ||
      (d.getDate() == end.getDate() && d.getMonth() == end.getMonth());
    return isInRange && !isToday;
  };

  static parseCalendarEvents = (events: CalendarEvent[]) => {
    const reduced = events.reduce((filtered, event) => {
      if (event.start) {
        filtered.push(event);
      }
      return filtered;
    }, []);

    return reduced;
  };
}
