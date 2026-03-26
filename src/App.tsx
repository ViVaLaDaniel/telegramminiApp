import { useEffect, useMemo, useState } from "react";

import {
  kitchenWorkspace,
  type SectionId,
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

function getStopStatusLabel(status: "out" | "low" | "soon"): string {
  switch (status) {
    case "out":
      return "Стоп";
    case "low":
      return "Мало";
    case "soon":
      return "Проверь";
  }
}

function getPrepStatusLabel(status: "ready" | "working" | "queued"): string {
  switch (status) {
    case "ready":
      return "Готово";
    case "working":
      return "В работе";
    case "queued":
      return "В очереди";
  }
}

function getTaskStatusLabel(status: "done" | "working" | "todo"): string {
  switch (status) {
    case "done":
      return "Сделано";
    case "working":
      return "В работе";
    case "todo":
      return "Ждет";
  }
}

export default function App() {
  const workspace = kitchenWorkspace;
  const [activeSection, setActiveSection] = useState<SectionId>("all");
  const [draft, setDraft] = useState("");
  const [showPinned, setShowPinned] = useState(true);
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

  const renderFeed = () => (
    <>
      <section className="surface-scroll" aria-label="Лента">
        <div className="system-pill">Шеф-линия кухни активна. Обновляйте статусы по ходу смены.</div>

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
                {message.text.split("\n").map((line, index, lines) => (
                  <span key={`${message.id}-${index}`}>
                    {line}
                    {index < lines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>

              {message.variant === "accent" || message.variant === "plain" || message.isOwn ? (
                <div className="message__footer message__footer--plain">
                  <time>{message.time}</time>
                </div>
              ) : message.reply ? (
                <div className="message__footer">
                  <span>Принято</span>
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
            placeholder="Сообщение на кухню"
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
    </>
  );

  const renderStopList = () => (
    <section className="surface-scroll" aria-label="Стоп-лист">
      <div className="section-hero">
        <div>
          <span className="section-hero__eyebrow">Критично для сервиса</span>
          <h2>Стоп-лист кухни</h2>
        </div>
        <div className="hero-chip hero-chip--danger">{workspace.stopList.length} позиции</div>
      </div>

      <div className="kpi-grid">
        <article className="metric-card">
          <span className="metric-card__label">Полный стоп</span>
          <strong>1</strong>
        </article>
        <article className="metric-card">
          <span className="metric-card__label">На исходе</span>
          <strong>1</strong>
        </article>
        <article className="metric-card">
          <span className="metric-card__label">Нужно подтвердить</span>
          <strong>1</strong>
        </article>
      </div>

      <div className="panel-stack">
        {workspace.stopList.map((item) => (
          <article key={item.id} className="ops-card ops-card--tight">
            <div className="ops-card__topline">
              <strong>{item.product}</strong>
              <span className={`status-pill status-pill--${item.status}`}>{getStopStatusLabel(item.status)}</span>
            </div>
            <p>{item.note}</p>
            <div className="ops-meta">
              <span>{item.station}</span>
              <time>{item.updatedAt}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderPrep = () => (
    <section className="surface-scroll" aria-label="Заготовки">
      <div className="section-hero">
        <div>
          <span className="section-hero__eyebrow">Подготовка к сервису</span>
          <h2>Заготовки по станциям</h2>
        </div>
        <div className="hero-chip">3 станции</div>
      </div>

      <div className="panel-stack">
        {workspace.prepStations.map((station) => (
          <article key={station.id} className="ops-card">
            <div className="ops-card__topline">
              <strong>{station.name}</strong>
              <span>{station.progress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-track__fill" style={{ width: `${station.progress}%` }} />
            </div>
            <div className="task-list">
              {station.items.map((item) => (
                <div key={item.id} className="task-row">
                  <div className="task-row__main">
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity} • {item.assignee}
                    </span>
                  </div>
                  <div className="task-row__side">
                    <span className={`status-pill status-pill--${item.status}`}>
                      {getPrepStatusLabel(item.status)}
                    </span>
                    <time>{item.dueAt}</time>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderTasks = () => (
    <section className="surface-scroll" aria-label="Задачи">
      <div className="section-hero">
        <div>
          <span className="section-hero__eyebrow">Контроль смены</span>
          <h2>Задачи кухни</h2>
        </div>
        <div className="hero-chip">3 блока</div>
      </div>

      <div className="panel-stack">
        {workspace.taskGroups.map((group) => (
          <article key={group.id} className="ops-card">
            <div className="ops-card__topline">
              <strong>{group.title}</strong>
              <span>{group.tasks.length} задач</span>
            </div>
            <div className="check-list">
              {group.tasks.map((task) => (
                <div key={task.id} className="check-item">
                  <div className={`check-mark check-mark--${task.status}`}></div>
                  <div className="check-item__copy">
                    <strong>{task.title}</strong>
                    <span>
                      {task.assignee} • {task.dueAt}
                    </span>
                  </div>
                  <span className={`status-pill status-pill--${task.status}`}>
                    {getTaskStatusLabel(task.status)}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderEvents = () => (
    <section className="surface-scroll" aria-label="Банкеты">
      <div className="section-hero">
        <div>
          <span className="section-hero__eyebrow">Календарь нагрузок</span>
          <h2>Банкеты и события</h2>
        </div>
        <div className="hero-chip">{workspace.banquets.length} события</div>
      </div>

      <div className="panel-stack">
        {workspace.banquets.map((banquet) => (
          <article key={banquet.id} className="ops-card ops-card--tight">
            <div className="ops-card__topline">
              <strong>{banquet.title}</strong>
              <span className={`status-pill status-pill--${banquet.priority === "high" ? "out" : "queued"}`}>
                {banquet.priority === "high" ? "Высокий приоритет" : "План"}
              </span>
            </div>
            <p>{banquet.note}</p>
            <div className="ops-meta">
              <span>{banquet.guests} гостей</span>
              <time>{banquet.time}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderTraining = () => (
    <section className="surface-scroll" aria-label="Обучение">
      <div className="section-hero">
        <div>
          <span className="section-hero__eyebrow">Стандарты кухни</span>
          <h2>Обучение и SOP</h2>
        </div>
        <div className="hero-chip">2 карточки</div>
      </div>

      <div className="panel-stack">
        {workspace.trainingCards.map((card) => (
          <article key={card.id} className="ops-card ops-card--tight">
            <div className="ops-card__topline">
              <strong>{card.title}</strong>
              <span>{card.duration}</span>
            </div>
            <p>{card.format}</p>
          </article>
        ))}
      </div>
    </section>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "all":
        return renderFeed();
      case "stop":
        return renderStopList();
      case "prep":
        return renderPrep();
      case "tasks":
        return renderTasks();
      case "events":
        return renderEvents();
      case "training":
        return renderTraining();
    }
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
                  <span className="pin-card__label">Pinned / today</span>
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
              <strong>Кухня online: обновляйте статусы в реальном времени</strong>
              <button type="button" aria-label="Закрыть">
                ×
              </button>
            </section>

            {renderSection()}
          </div>
        </section>
      </main>
    </div>
  );
}
