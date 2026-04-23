import { AuthFormSection } from "@/modules/auth/components/auth-form-section";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";

type PageProps = {
  params: Promise<{ mode: AuthMode }>;
  searchParams: Promise<{ next?: string }>;
};

const authModes: AuthMode[] = ["login", "register"];

export const dynamicParams = false;

export const generateStaticParams = () =>
  authModes.map((mode) => ({ mode }));

const Page = async ({ params, searchParams }: PageProps) => {
  const { mode } = await params;
  const resolvedSearchParams = await searchParams;

  return <AuthFormSection mode={mode} nextPath={resolvedSearchParams.next} />;
};

export default Page;
