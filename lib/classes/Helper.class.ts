import { CalendarEvent } from './../types/calendarEvent';

export class Helper {
  static daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  static isToday = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  static getWeekNumber = (d: Date) => {
    const finalDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    finalDate.setUTCDate(finalDate.getUTCDate() + 4 - (finalDate.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(finalDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((finalDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return [finalDate.getUTCFullYear(), weekNo];
  };

  static isInBetween = (d: Date, start: Date, end: Date) => {
    const isInRange = start.getTime() < d.getTime() && d.getTime() < end.getTime();
    const isToday =
      (d.getDate() == start.getDate() && d.getMonth() == start.getDate()) ||
      (d.getDate() == end.getDate() && d.getMonth() == end.getMonth());
    return isInRange && !isToday;
  };

  static parseCalendarEvents = (events: CalendarEvent[]) => {
    // TODO: add filtering for invalid calendar events provided by user and return an error message
    const validEvents: CalendarEvent[] = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      if (!event.id) {
        console.warn(`${event.title} is missing an id property`);
        continue;
      }

      if (event.start) validEvents.push(event);
      else {
        console.warn(`${event.title} is missing a start property`);
        continue;
      }
    }

    return validEvents;
  };
}
