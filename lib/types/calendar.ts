import { CalendarEvent } from './calendarEvent';
import { Day } from './day';
import { Locale } from './locales';

export type PlainOptions = {
  locale?: Locale;
  editable?: boolean;
  clickable?: boolean;
  readonly?: boolean;
  disableTooltip?: boolean;
  hideCopyright?: boolean;
  showDebugLogs?: boolean;
  maxEventsPerDay?: number;
};

export type EventOptions = {
  onClick?: (target: { date: Day }) => void;
  onEventClick?: (event: CalendarEvent, mouseEvent: MouseEvent) => unknown | null;
};

export type DataOptions = {
  events: CalendarEvent[];
};

export type CalendarOptions = PlainOptions & EventOptions & DataOptions;

export type Elements = {
  root: HTMLElement | null;
  header: HTMLElement | null;
  headerContainer: HTMLElement | null;
  body: HTMLElement | null;
  innerBody: HTMLElement | null;
  toolbar: ToolbarElements;
  footer: HTMLElement | null;
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

export type HTMLElementProps = {
  type: keyof HTMLElementTagNameMap;
  content?: string;
  classes?: string | string[];
  id?: string;
  href?: string;
  rel?: 'stylesheet';
  onclick?: (this: GlobalEventHandlers, ev: MouseEvent) => void;
};

export type OpenPluginCalendar = DataOptions;
