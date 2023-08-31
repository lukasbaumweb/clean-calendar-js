import { Calendar } from './classes/Calendar.class';
import './../sass/Calendar.scss';

declare global {
  interface Window {
    CleanCalendarJS: typeof Calendar;
  }
}

window['CleanCalendarJS'] = Calendar;
