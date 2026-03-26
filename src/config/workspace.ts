export type Section = {
  id: string;
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

export type RestaurantWorkspace = {
  restaurantId: string;
  restaurantName: string;
  roleName: string;
  telegramHandle: string;
  pinnedValue: string;
  sections: Section[];
  messages: WorkspaceMessage[];
};

export const kitchenWorkspace: RestaurantWorkspace = {
  restaurantId: "verda",
  restaurantName: "Verda Caffe & Bar",
  roleName: "Повара",
  telegramHandle: "Vadim.prepare",
  pinnedValue: "+34 653 049 968",
  sections: [
    { id: "all", icon: "💬", label: "Все" },
    { id: "rules", icon: "#", label: "Правила" },
    { id: "prep", icon: "▦", label: "Заготовки" },
    { id: "events", icon: "🍓", label: "Банкеты" },
    { id: "ideas", icon: "…", label: "Идеи" },
    { id: "tasks", icon: "▤", label: "Задачи" },
    { id: "training", icon: "☕", label: "Обучение" },
  ],
  messages: [
    {
      id: "m1",
      author: "Vadim Slushniy",
      time: "21:01",
      text: "Це буде сет на компанію тарілк... пиво 0,5?",
      color: "gold",
    },
    {
      id: "m2",
      author: "YA",
      time: "21:03",
      text: "пиво 0,5?\nДа",
      color: "blue",
      variant: "nested",
      reply: {
        author: "YA",
        channel: "In Joy",
      },
    },
    {
      id: "m3",
      author: "In Joy",
      time: "21:04",
      text: "Оно не сухое? так интересно\nОчень вкусное все",
      color: "blue",
    },
    {
      id: "m4",
      author: "In Joy",
      time: "21:04",
      text: "Кроме квадратной картошки кубиками",
      variant: "plain",
    },
    {
      id: "m5",
      author: "Vadim Slushniy",
      role: "Владелец",
      time: "21:05",
      text: "Мы може квадратну картошку на сирні палочки",
      color: "gold",
      variant: "accent",
    },
  ],
};
