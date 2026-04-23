import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthFormSection } from "@/modules/auth/components/auth-form-section";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";
import { authFormModes } from "@/modules/auth/constants/auth-form-modes";

type PageProps = {
  params: Promise<{ mode: AuthMode }>;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { mode } = await params;
  return { title: authFormModes[mode].heading };
};

const authModes: AuthMode[] = ["login", "register"];

export const dynamicParams = false;

export const generateStaticParams = () =>
  authModes.map((mode) => ({ mode }));

const Page = async ({ params }: PageProps) => {
  const { mode } = await params;

  return (
    <Suspense>
      <AuthFormSection mode={mode} />
    </Suspense>
  );
};

export default Page;
