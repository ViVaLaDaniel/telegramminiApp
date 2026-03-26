import { backButton, init } from "@tma.js/sdk-react";

export type TelegramContext = {
  firstName: string | null;
  username: string | null;
  isTelegram: boolean;
};

export function getTelegramContext(): TelegramContext {
  const webApp = window.Telegram?.WebApp;

  if (!webApp) {
    return {
      firstName: null,
      username: null,
      isTelegram: false,
    };
  }

  return {
    firstName: webApp.initDataUnsafe?.user?.first_name ?? null,
    username: webApp.initDataUnsafe?.user?.username ?? null,
    isTelegram: true,
  };
}

export function mountTelegramSdk(): (() => void) | undefined {
  const webApp = window.Telegram?.WebApp;

  if (!webApp) {
    return undefined;
  }

  init();
  webApp.ready();
  webApp.expand();

  backButton.mount();
  backButton.show();

  const unsubscribe = backButton.onClick(() => {
    window.history.back();
  });

  return () => {
    unsubscribe();
    backButton.hide();
  };
}
