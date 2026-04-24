import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getRequestLocaleFromParams,
  setRequestLocaleFromParams,
  type LocaleParamsPromise,
} from "@/i18n/request-locale";
import { AuthFormSection } from "@/modules/auth/components/auth-form-section";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";

type PageProps = {
  params: Promise<{ locale: string; mode: AuthMode }>;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const [{ mode }, locale] = await Promise.all([
    params,
    getRequestLocaleFromParams(params as LocaleParamsPromise),
  ]);
  const t = await getTranslations({ locale });

  return { title: t(`auth.form.${mode}.heading`) };
};

const authModes: AuthMode[] = ["login", "register"];

export const dynamicParams = false;

export const generateStaticParams = () =>
  authModes.map((mode) => ({ mode }));

const Page = async ({ params }: PageProps) => {
  const [{ mode }] = await Promise.all([
    params,
    setRequestLocaleFromParams(params as LocaleParamsPromise),
  ]);

  return (
    <Suspense>
      <AuthFormSection mode={mode} />
    </Suspense>
  );
};

export default Page;
