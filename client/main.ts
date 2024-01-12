import CleanCalendarJS from '../lib/index';
import { CalendarEvent } from '../lib/types/calendarEvent';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const events: CalendarEvent[] = [
  {
    id: 1,
    title: 'Test 0',
    start: new Date(currentYear, currentMonth, 16),
  },
  {
    id: 2,
    title: 'Test 1',
    start: new Date(currentYear, currentMonth, 16),
  },
  {
    id: 3,
    title: 'Test 2',
    description: 'Event 12-15',
    start: new Date(currentYear, currentMonth, 12),
    end: new Date(currentYear, currentMonth, 15),
  },
  {
    id: 4,
    title: 'Test 3',
    description: 'Event 12',
    start: new Date(currentYear, currentMonth, 12),
    color: '#111111',
  },
  {
    id: 5,
    title: 'Test 4',
    description: 'Event 12-20',
    start: new Date(currentYear, currentMonth, 12),
    end: new Date(currentYear, currentMonth, 20),
    color: '#4444ff',
  },
  {
    id: 6,
    title: 'Test 5',
    description: 'Event 16-18',
    start: new Date(currentYear, currentMonth, 16),
    end: new Date(currentYear, currentMonth, 18),
    color: '#92140C',
  },
  {
    id: 7,
    title: 'Test 6',
    description: 'Event 30-6',
    start: new Date(currentYear, currentMonth - 1, 30),
    end: new Date(currentYear, currentMonth, 6),
    color: '#81E979',
  },
  {
    id: 8,
    title: 'Test 7',
    description: 'Event 25-5',
    start: new Date(currentYear, currentMonth - 1, 25),
    end: new Date(currentYear, currentMonth, 5),
    color: '#5BC0BE',
  },
  {
    id: 9,
    title: 'Test 8',
    description: 'Event 28-31',
    start: new Date(currentYear, currentMonth - 1, 28),
    end: new Date(currentYear, currentMonth - 1, 31),
    color: '#3F334D',
  },
  {
    id: 10,
    title: 'Test 9',
    description: 'Event 12',
    start: new Date(currentYear, currentMonth, 7),
    end: new Date(currentYear, currentMonth, 12),
    color: '#ddd',
  },
];
const calendar = new CleanCalendarJS('.calendar', {
  locale: 'de_DE',
  events,
});
calendar.init();
