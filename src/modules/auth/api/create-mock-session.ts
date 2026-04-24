import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";

type MockSessionProvider = "credentials" | "telegram" | "google";

type CreateMockSessionParams = {
  mode: AuthMode;
  provider: MockSessionProvider;
};

export const createMockSession = async ({
  mode,
  provider,
}: CreateMockSessionParams) => {
  const response = await fetch("/api/auth/mock-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mode,
      provider,
    }),
  });

  if (!response.ok) {
    throw new Error("CREATE_MOCK_SESSION_FAILED");
  }

  return response.json();
};
