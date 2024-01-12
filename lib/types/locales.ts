export type Locale = "de_DE" | "en_US";

export type LocalizationKeys = keyof Localization;

export type Localization = {
  days: string[];
  months: string[];
  loading: string;
  allDay: string;
};
