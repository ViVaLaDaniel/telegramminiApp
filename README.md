# Verda Staff Mini App

React + TypeScript + Vite прототип Telegram Mini App для кухни ресторана, визуально вдохновленный референсом из `WhatsApp Image 2026-03-25 at 21.06.02.jpeg`.

## Stack

- Vite
- React
- TypeScript
- Telegram Mini Apps SDK: `@tma.js/sdk-react`

## Commands

```bash
npm install
npm run dev
```

Дополнительно:

```bash
npm run lint
npm run typecheck
npm run build
```

## Current scope

- мобильный shell в стиле Telegram
- левая навигационная панель для kitchen workspace
- kitchen feed / announcements
- экран `Стоп-лист`
- экран `Заготовки`
- экран `Задачи`
- экран `Банкеты`
- экран `Обучение`
- базовая интеграция с Telegram WebApp / SDK

## Configuration model

Проект уже заложен под переиспользование для разных ресторанов и ролей.

Основная конфигурация лежит в:

`src/config/workspace.ts`

Там можно менять:

- ресторан
- роль
- состав бокового меню
- pinned summary
- stop list
- prep stations
- shift tasks
- banquet cards
