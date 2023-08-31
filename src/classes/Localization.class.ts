import { DE } from './../locales/de_DE';
import { EN } from './../locales/en_US';
import { Locale, LocalizationKeys } from './../types/locales';

export class Localization {
  static locale = Locale.EN;

  static get months() {
    switch (this.locale) {
      case Locale.DE:
        return DE.months;

      default:
        return EN.months;
    }
  }

  static get days() {
    switch (this.locale) {
      case Locale.DE:
        return DE.days;

      default:
        return EN.days;
    }
  }

  static localizeDay(index: number) {
    switch (this.locale) {
      case Locale.DE:
        return DE.days[index].substring(0, 2);

      default:
        return EN.days[index].substring(0, 3);
    }
  }

  static localize(key: LocalizationKeys): string | string[] {
    switch (this.locale) {
      case Locale.DE:
        return DE[key];

      default:
        return EN[key];
    }
  }
}
