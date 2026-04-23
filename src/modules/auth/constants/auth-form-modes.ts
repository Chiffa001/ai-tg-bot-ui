export type AuthMode = "login" | "register";

export const authFormModes = {
  login: {
    heading: "Войти в аккаунт",
    submitLabel: "Войти",
    subtitle: "Продолжите автоматизировать ответы в Telegram",
    toggleHref: "/auth/register",
    toggleLabel: "Нет аккаунта?",
    toggleLinkLabel: "Зарегистрироваться",
  },
  register: {
    heading: "Создать аккаунт",
    submitLabel: "Зарегистрироваться",
    subtitle: "Начните автоматизировать ответы в Telegram",
    toggleHref: "/auth/login",
    toggleLabel: "Уже есть аккаунт?",
    toggleLinkLabel: "Войти",
  },
} as const;
