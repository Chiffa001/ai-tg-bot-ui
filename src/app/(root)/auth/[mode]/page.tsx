import { notFound } from "next/navigation";
import { AuthFormSection } from "@/modules/auth/components/auth-form-section";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";

type PageProps = {
  params: Promise<{ mode: string }>;
};

const authModes: AuthMode[] = ["login", "register"];

export const generateStaticParams = () =>
  authModes.map((mode) => ({ mode }));

const Page = async ({ params }: PageProps) => {
  const { mode } = await params;

  if (!authModes.includes(mode as AuthMode)) {
     return notFound();
  }

  return <AuthFormSection mode={mode as AuthMode} />;
};

export default Page;
