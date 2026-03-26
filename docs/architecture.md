# Architecture

## Purpose

Этот проект строится как одна Telegram Mini App платформа для операционной работы ресторанного персонала.

Первая роль:

- повара / кухня

Дальше на той же базе должны появляться:

- бар
- зал
- админы
- менеджеры
- разные рестораны и локации

## Core idea

Не делать отдельное приложение под каждый ресторан и каждую роль.

Правильная модель:

1. один общий Mini App shell
2. один общий UI language и navigation pattern
3. конфигурация под конкретный ресторан
4. конфигурация под конкретную роль
5. роль определяет, какие разделы видны в левом меню и какие действия доступны

## Current technical state

Сейчас проект это:

- `Vite`
- `React`
- `TypeScript`
- `@tma.js/sdk-react`

Текущий shell уже поддерживает:

- Telegram-like mobile layout
- левую вертикальную навигацию
- pinned block
- role workspace concept
- kitchen operational sections

## Current app structure

Основная точка входа:

- `src/App.tsx`

Текущая конфигурация workspace:

- `src/config/workspace.ts`

Telegram integration:

- `src/lib/telegram.ts`

Styles:

- `src/styles/app.css`

## Domain model

На текущем этапе минимальная доменная модель такая:

- `Restaurant`
- `Role`
- `Workspace`
- `Section`
- `Announcement`
- `StopListItem`
- `PrepStation`
- `PrepTask`
- `ShiftTask`
- `BanquetEvent`
- `TrainingCard`

## Workspace model

`Workspace` должен определять:

- `restaurantId`
- `restaurantName`
- `roleName`
- `telegramHandle`
- `sections`
- `pinned summary`
- operational data for each section

Это позволяет один и тот же shell переиспользовать без переписывания UI.

## Frontend architecture direction

Frontend должен идти в такую форму:

1. `App shell`
2. `Workspace loader`
3. `Section router`
4. `Feature modules`

Целевое разбиение:

- `src/app`
- `src/features/feed`
- `src/features/stop-list`
- `src/features/prep`
- `src/features/tasks`
- `src/features/events`
- `src/features/training`
- `src/entities`
- `src/shared`

Сейчас код еще компактный и собран в более простую структуру, что нормально для раннего MVP.

## Backend architecture direction

Backend пока не реализован, но целевая схема должна быть такой:

1. Telegram bot opens Mini App
2. Mini App receives Telegram init data
3. Backend validates init data
4. Backend resolves user -> restaurant -> role -> workspace permissions
5. Frontend получает workspace config и данные секций

Минимальные backend responsibilities:

- verify Telegram init data
- identify user
- map user to restaurant and role
- return workspace config
- CRUD for stop-list
- CRUD for prep tasks
- CRUD for shift tasks
- announcements / feed entries

## Data truth

На текущем этапе truth временно лежит в frontend config.

Это временно.

Целевая truth model:

- workspace config и доступы живут на backend
- operational data живут в базе
- frontend только отображает и обновляет данные через typed API

## Security constraints

Нельзя доверять роли пользователя только из frontend.

Обязательные правила:

- Telegram init data проверяется на backend
- доступ к restaurant/role определяется сервером
- frontend не хранит секреты
- bot token не попадает в repo

## Product architecture direction

Для кухни целевые основные модули:

- лента команды
- стоп-лист
- заготовки
- задачи смены
- банкеты
- обучение / SOP

Для следующих ролей later:

- зал
- бар
- менеджер

## Decisions

Решения, которые уже приняты:

- Mini App будет Telegram-first
- UI будет мобильный и shell-based
- боковое меню это core interaction pattern
- разные рестораны должны жить на одной кодовой базе
- разные роли должны включаться через конфигурацию и permissions
- первый vertical slice это кухня

## Open questions

- где будет храниться restaurant/role mapping
- какой backend выбрать для fastest secure launch
- нужен ли real-time transport с первого релиза
- как именно оформлять multi-restaurant onboarding
- нужна ли офлайн-поддержка на раннем этапе

## Immediate next technical step

Следующий правильный technical step:

1. вынести current sections в feature modules
2. выбрать backend
3. сделать Telegram auth handshake
4. перевести stop-list и tasks на реальные CRUD операции
