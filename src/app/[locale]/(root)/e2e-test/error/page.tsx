export const dynamic = "force-dynamic";

const E2EErrorPage = () => {
  throw new Error("E2E_LOCALIZED_ERROR");
};

export default E2EErrorPage;
