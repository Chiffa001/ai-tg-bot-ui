export const sleep = (ms: number) =>
  new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });

export const buildBotUsername = (token: string) => {
  const id = token.split(":")[0];

  return `@telebot_${id.slice(-4)}`;
};
