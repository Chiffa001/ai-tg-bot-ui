import { getTranslations } from "next-intl/server";
import { NotFoundPage } from "@/modules/errors/components/not-found-page";
import { resolveRequestLocale } from "@/i18n/server-locale";

const NotFound = async () => {
  const locale = await resolveRequestLocale();
  const t = await getTranslations({
    locale,
    namespace: "errors.notFound",
  });

  return (
    <NotFoundPage
      title={t("title")}
      description={t("description")}
      backHomeLabel={t("backHome")}
      homeHref={`/${locale}`}
    />
  );
};

export default NotFound;
