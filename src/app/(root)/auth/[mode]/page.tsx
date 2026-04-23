import { AuthFormSection } from "@/modules/auth/components/auth-form-section";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";

type PageProps = {
  params: Promise<{ mode: AuthMode }>;
};

const authModes: AuthMode[] = ["login", "register"];

export const dynamicParams = false;

export const generateStaticParams = () =>
  authModes.map((mode) => ({ mode }));

const Page = async ({ params }: PageProps) => {
  const { mode } = await params;

  return <AuthFormSection mode={mode} />;
};

export default Page;
