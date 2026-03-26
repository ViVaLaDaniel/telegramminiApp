export type SectionId =
  | "all"
  | "stop"
  | "prep"
  | "events"
  | "tasks"
  | "training";

export type Section = {
  id: SectionId;
  icon: string;
  label: string;
};

export type WorkspaceMessage = {
  id: string;
  author: string;
  role?: string;
  time: string;
  text: string;
  color?: "gold" | "blue" | "muted";
  variant?: "default" | "nested" | "accent" | "plain";
  reply?: {
    author: string;
    channel: string;
  };
};

export type StopListItem = {
  id: string;
  product: string;
  station: string;
  status: "out" | "low" | "soon";
  note: string;
  updatedAt: string;
};

export type PrepTask = {
  id: string;
  name: string;
  quantity: string;
  dueAt: string;
  assignee: string;
  status: "ready" | "working" | "queued";
};

export type PrepStation = {
  id: string;
  name: string;
  progress: number;
  items: PrepTask[];
};

export type ShiftTask = {
  id: string;
  title: string;
  assignee: string;
  dueAt: string;
  status: "done" | "working" | "todo";
};

export type TaskGroup = {
  id: string;
  title: string;
  tasks: ShiftTask[];
};

export type BanquetEvent = {
  id: string;
  title: string;
  guests: number;
  time: string;
  note: string;
  priority: "high" | "normal";
};

export type TrainingCard = {
  id: string;
  title: string;
  duration: string;
  format: string;
};

export type RestaurantWorkspace = {
  restaurantId: string;
  restaurantName: string;
  roleName: string;
  telegramHandle: string;
  pinnedValue: string;
  sections: Section[];
  messages: WorkspaceMessage[];
  stopList: StopListItem[];
  prepStations: PrepStation[];
  taskGroups: TaskGroup[];
  banquets: BanquetEvent[];
  trainingCards: TrainingCard[];
};

export const kitchenWorkspace: RestaurantWorkspace = {
  restaurantId: "verda",
  restaurantName: "Verda Caffe & Bar",
  roleName: "Повара",
  telegramHandle: "Vadim.prepare",
  pinnedValue: "Сегодня 3 банкета и 1 дегустация",
  sections: [
    { id: "all", icon: "💬", label: "Лента" },
    { id: "stop", icon: "⛔", label: "Стоп-лист" },
    { id: "prep", icon: "▦", label: "Заготовки" },
    { id: "events", icon: "🍓", label: "Банкеты" },
    { id: "tasks", icon: "▤", label: "Задачи" },
    { id: "training", icon: "☕", label: "Обучение" },
  ],
  messages: [
    {
      id: "m1",
      author: "Шеф",
      time: "09:15",
      text: "Проверяем остатки по лососю и трюфельному соусу до 10:00.",
      color: "gold",
    },
    {
      id: "m2",
      author: "Су-шеф",
      time: "09:22",
      text: "Стоп по фокачче до новой выпечки.\nБанкет в 18:30 без орехов.",
      color: "blue",
      variant: "nested",
      reply: {
        author: "Зал",
        channel: "Хостес",
      },
    },
    {
      id: "m3",
      author: "Admin",
      time: "09:40",
      text: "Пожалуйста, отмечайте готовые заготовки сразу в списке смены.",
      color: "blue",
    },
    {
      id: "m4",
      author: "Owner",
      time: "10:05",
      text: "Приоритет на сегодня: скорость отдачи, чистый стоп-лист, без потерь по заготовкам.",
      variant: "plain",
    },
    {
      id: "m5",
      author: "Vadim Slushniy",
      role: "Владелец",
      time: "10:12",
      text: "К банкету на 18:30 делаем отдельный prep lane и ответственного на cold section.",
      color: "gold",
      variant: "accent",
    },
  ],
  stopList: [
    {
      id: "s1",
      product: "Фокачча",
      station: "Горячий цех",
      status: "out",
      note: "Следующая партия выйдет после 12:30",
      updatedAt: "09:18",
    },
    {
      id: "s2",
      product: "Трюфельный соус",
      station: "Соусы",
      status: "low",
      note: "Остаток на 14 порций",
      updatedAt: "09:27",
    },
    {
      id: "s3",
      product: "Лосось гравлакс",
      station: "Холодный цех",
      status: "soon",
      note: "Нужно срочно подтвердить разморозку",
      updatedAt: "09:41",
    },
  ],
  prepStations: [
    {
      id: "p1",
      name: "Холодный цех",
      progress: 72,
      items: [
        {
          id: "p1-1",
          name: "Гравлакс",
          quantity: "4 гастроемкости",
          dueAt: "11:00",
          assignee: "Илья",
          status: "working",
        },
        {
          id: "p1-2",
          name: "Соус юдзу",
          quantity: "2 л",
          dueAt: "11:30",
          assignee: "Марта",
          status: "queued",
        },
      ],
    },
    {
      id: "p2",
      name: "Горячий цех",
      progress: 54,
      items: [
        {
          id: "p2-1",
          name: "Деми-гляс",
          quantity: "6 л",
          dueAt: "12:00",
          assignee: "Руслан",
          status: "working",
        },
        {
          id: "p2-2",
          name: "Картофельные ньокки",
          quantity: "90 порций",
          dueAt: "13:00",
          assignee: "Антон",
          status: "queued",
        },
      ],
    },
    {
      id: "p3",
      name: "Пицца / печь",
      progress: 91,
      items: [
        {
          id: "p3-1",
          name: "Тесто 72h",
          quantity: "28 шаров",
          dueAt: "готово",
          assignee: "Олег",
          status: "ready",
        },
      ],
    },
  ],
  taskGroups: [
    {
      id: "t1",
      title: "Открытие смены",
      tasks: [
        {
          id: "t1-1",
          title: "Проверить stop-list и остатки по топ-позициям",
          assignee: "Су-шеф",
          dueAt: "10:00",
          status: "done",
        },
        {
          id: "t1-2",
          title: "Раздать станции и подтвердить prep owners",
          assignee: "Шеф",
          dueAt: "10:15",
          status: "working",
        },
      ],
    },
    {
      id: "t2",
      title: "Сервис",
      tasks: [
        {
          id: "t2-1",
          title: "Подготовить аллергенный чек-лист под банкет",
          assignee: "Марта",
          dueAt: "16:30",
          status: "todo",
        },
        {
          id: "t2-2",
          title: "Выделить cold lane под банкет 18:30",
          assignee: "Илья",
          dueAt: "17:30",
          status: "todo",
        },
      ],
    },
    {
      id: "t3",
      title: "Закрытие",
      tasks: [
        {
          id: "t3-1",
          title: "Списания и фото остатков по рыбе",
          assignee: "Руслан",
          dueAt: "23:00",
          status: "todo",
        },
      ],
    },
  ],
  banquets: [
    {
      id: "b1",
      title: "День рождения / terrace",
      guests: 22,
      time: "18:30",
      note: "без орехов, 4 вегетарианских позиции",
      priority: "high",
    },
    {
      id: "b2",
      title: "Private dinner / chef table",
      guests: 8,
      time: "20:00",
      note: "wine pairing, нужна отдельная подача amuse",
      priority: "normal",
    },
  ],
  trainingCards: [
    {
      id: "tr1",
      title: "Стандарт plating для cold starters",
      duration: "8 мин",
      format: "Фото + чек-лист",
    },
    {
      id: "tr2",
      title: "Работа со стоп-листом во время сервиса",
      duration: "5 мин",
      format: "Видео",
    },
  ],
};
