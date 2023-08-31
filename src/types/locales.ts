export enum Locale {
  DE = 'DE',
  EN = 'EN',
}

export type LocalizationKeys = keyof Localization;

export type Localization = {
  days: string[];
  months: string[];
  loading: string;
  allDay: string;
};
