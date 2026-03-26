import { useEffect, useMemo, useState } from "react";

import {
  kitchenWorkspace,
  type WorkspaceMessage,
} from "./config/workspace";
import {
  getTelegramContext,
  mountTelegramSdk,
  type TelegramContext,
} from "./lib/telegram";

type UserMessage = WorkspaceMessage & {
  isOwn?: boolean;
};

function getCurrentTimeLabel(): string {
  return new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function App() {
  const [activeSection, setActiveSection] = useState("all");
  const [draft, setDraft] = useState("");
  const [showPinned, setShowPinned] = useState(true);
  const workspace = kitchenWorkspace;
  const [telegramContext] = useState<TelegramContext>(() => getTelegramContext());
  const [messages, setMessages] = useState<UserMessage[]>(workspace.messages);

  useEffect(() => {
    const cleanup = mountTelegramSdk();

    return cleanup;
  }, []);

  const subtitle = useMemo(() => {
    if (telegramContext.username) {
      return `@${telegramContext.username}`;
    }

    if (telegramContext.firstName) {
      return telegramContext.firstName;
    }

    return workspace.telegramHandle;
  }, [telegramContext.firstName, telegramContext.username, workspace.telegramHandle]);

  const sendMessage = () => {
    const trimmedDraft = draft.trim();

    if (!trimmedDraft) {
      return;
    }

    const nextMessage: UserMessage = {
      id: crypto.randomUUID(),
      author: telegramContext.firstName ?? "Вы",
      time: getCurrentTimeLabel(),
      text: trimmedDraft,
      variant: "plain",
      isOwn: true,
    };

    setMessages((currentMessages) => [...currentMessages, nextMessage]);
    setDraft("");
  };

  return (
    <div className="phone">
      <div className="statusbar">
        <span>21:05</span>
        <div className="statusbar__icons">
          <span>◔</span>
          <span>⌁</span>
          <span>◒</span>
          <span className="statusbar__battery">48</span>
        </div>
      </div>

      <main className="app-shell">
        <header className="chat-header">
          <button className="icon-button" type="button" aria-label="Назад">
            ←
          </button>
          <div className="chat-header__avatar">V</div>
          <div className="chat-header__copy">
            <strong>
              {workspace.restaurantName} {workspace.roleName}
            </strong>
            <span>{subtitle}</span>
          </div>
          <button className="icon-button" type="button" aria-label="Меню">
            ⋮
          </button>
        </header>

        <section className="chat-board">
          <aside className="nav-rail">
            <div className="nav-rail__top">
              <div className="nav-rail__logo">V</div>
            </div>

            <nav className="rail-menu" aria-label="Навигация">
              {workspace.sections.map((item) => (
                <button
                  key={item.id}
                  className={`rail-item ${activeSection === item.id ? "rail-item--active" : ""}`}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="rail-item__icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="chat-surface">
            {showPinned ? (
              <section className="pin-card">
                <div className="pin-card__stripe"></div>
                <div className="pin-card__content">
                  <span className="pin-card__label">Закрепленное сообщение</span>
                  <strong>{workspace.pinnedValue}</strong>
                </div>
                <button
                  className="pin-card__dismiss"
                  type="button"
                  aria-label="Закрыть"
                  onClick={() => setShowPinned(false)}
                >
                  ×
                </button>
              </section>
            ) : null}

            <section className="warning-card">
              <strong>Сообщить о спаме и покинуть</strong>
              <button type="button" aria-label="Закрыть">
                ×
              </button>
            </section>

            <section className="message-stream" aria-label="Переписка">
              <div className="system-pill">
                Vadim Slushniy пригласил(а) Вас в эту группу
              </div>

              {messages.map((message) => (
                <article
                  key={message.id}
                  className={`message ${message.variant ? `message--${message.variant}` : ""} ${message.isOwn ? "message--own" : ""}`}
                >
                  <div className="message__bubble">
                    {message.reply ? (
                      <div className="message__replybar">
                        <strong>{message.reply.author}</strong>
                        <span>{message.reply.channel}</span>
                      </div>
                    ) : null}

                    {message.variant === "accent" ? (
                      <div className="message__quote-head">
                        <div className="message__quote-avatar"></div>
                        <div>
                          <strong className={`message__author message__author--${message.color ?? "muted"}`}>
                            {message.author}
                          </strong>
                          {message.role ? <span>{message.role}</span> : null}
                        </div>
                      </div>
                    ) : (
                      <div className="message__meta">
                        <strong className={`message__author message__author--${message.color ?? "muted"}`}>
                          {message.author}
                        </strong>
                        <span>{message.time}</span>
                      </div>
                    )}

                    <p>
                      {message.text.split("\n").map((line, index) => (
                        <span key={`${message.id}-${index}`}>
                          {line}
                          {index < message.text.split("\n").length - 1 ? <br /> : null}
                        </span>
                      ))}
                    </p>

                    {message.variant === "accent" || message.variant === "plain" || message.isOwn ? (
                      <div className="message__footer message__footer--plain">
                        <time>{message.time}</time>
                      </div>
                    ) : message.reply ? (
                      <div className="message__footer">
                        <span>Да</span>
                        <time>{message.time}</time>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </section>

            <footer className="composer">
              <button className="composer__icon" type="button" aria-label="Эмодзи">
                ☺
              </button>
              <label className="composer__field">
                <span className="sr-only">Сообщение</span>
                <input
                  id="messageInput"
                  type="text"
                  placeholder="Написать в Правила"
                  autoComplete="off"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </label>
              <button className="composer__icon" type="button" aria-label="Вложение">
                ⌁
              </button>
              <button
                id="sendButton"
                className="composer__send"
                type="button"
                aria-label="Отправить"
                onClick={sendMessage}
              >
                {draft.trim() ? "↑" : "●"}
              </button>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
