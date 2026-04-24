import type en from "../locales/en.json";
import type { AppLocale } from "@/i18n/routing";

declare module "use-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: typeof en;
  }
}
