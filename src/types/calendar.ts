import { CalendarEvent } from './calendarEvent';
import { Day } from './day';
import { Locale } from './locales';

export interface CalendarOptions {
  locale?: Locale;
  editable?: boolean;
  clickable?: boolean;
  readonly?: boolean;
  onClick?: (target: { date: Day }) => void;
  onEventClick?: (event: CalendarEvent, mouseEvent: MouseEvent) => unknown | null;
  events?: CalendarEvent[];
  disableTooltip?: boolean;
}

export type Elements = {
  root: HTMLElement | null;
  header: HTMLElement | null;
  headerContainer: HTMLElement | null;
  body: HTMLElement | null;
  innerBody: HTMLElement | null;
  toolbar: ToolbarElements;
  footer: HTMLElement;
};

export type ToolbarElements = {
  root: HTMLElement | null;
  btnGroundContainer: HTMLElement | null;
  prevBtn: HTMLButtonElement | null;
  nextBtn: HTMLButtonElement | null;
  todayBtn: HTMLButtonElement | null;
  current: HTMLElement | null;
  viewChangerContainer: HTMLElement | null;
};
