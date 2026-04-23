import Link from "next/link";
import {
  authFormModes,
  type AuthMode,
} from "@/modules/auth/constants/auth-form-modes";
import { AuthCredentialsForm } from "@/modules/auth/components/auth-credentials-form";
import { AuthRouteWrapper } from "@/modules/auth/components/auth-route-wrapper";
import { GlobeIcon } from "@/modules/auth/components/icons/globe-icon";
import { TelegramIcon } from "@/modules/auth/components/icons/telegram-icon";
import { BrandLogo } from "@/shared/components/brand-logo";
import { Button } from "@/shared/components/ui/button";
import { ContentColumn } from "@/shared/components/content/content-column";
import { ContentPanel } from "@/shared/components/content/content-panel";
import { Divider } from "@/shared/components/ui/divider";

type AuthFormSectionProps = {
  mode: AuthMode;
};

export const AuthFormSection = ({ mode }: AuthFormSectionProps) => {
  const content = authFormModes[mode];

  return (
    <AuthRouteWrapper mode={mode}>
      <ContentPanel>
        <ContentColumn size="sm">
          <BrandLogo size="sm" tone="dark" className="justify-center" />

          <div className="mt-7 flex w-full flex-col items-center gap-2 text-center">
            <h1 className="text-[28px] font-bold tracking-tight text-slate-950">
              {content.heading}
            </h1>
            <p className="text-sm text-muted">{content.subtitle}</p>
          </div>

          <div className="mt-7 flex w-full flex-col gap-3">
            <Button variant="telegram" className="w-full">
              <TelegramIcon />
              Войти через Telegram
            </Button>
            <Button variant="secondary" className="w-full">
              <GlobeIcon />
              Войти через Google
            </Button>
          </div>

          <Divider className="mt-5">
            <span className="text-xs font-medium text-muted">или</span>
          </Divider>

          <AuthCredentialsForm mode={mode} submitLabel={content.submitLabel} />

          <p className="mt-5 text-sm text-muted">
            {content.toggleLabel}{" "}
            <Link
              href={content.toggleHref}
              className="font-semibold text-accent hover:text-accent-strong"
            >
              {content.toggleLinkLabel}
            </Link>
          </p>
        </ContentColumn>
      </ContentPanel>
    </AuthRouteWrapper>
  );
};
