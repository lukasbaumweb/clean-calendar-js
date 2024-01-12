import { Locale, LocalizationKeys } from "./../types/locales";
import Locales from "../../assets/locales";

export class Localization {
  static locale: Locale = "en_US";

  static get months() {
    return Locales[this.locale].months;
  }

  static get days() {
    return Locales[this.locale].days;
  }

  static localizeDay(index: number) {
    return Object.values(this.days)[index].substring(
      0,
      this.locale === "en_US" ? 3 : 2
    );
  }

  static localize(key: LocalizationKeys): string | object {
    return Locales[this.locale][key];
  }
}
