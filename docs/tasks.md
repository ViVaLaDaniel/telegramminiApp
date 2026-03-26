# Tasks

## Current objective

Собрать первый usable kitchen workspace для одного ресторана на базе Telegram Mini App.

## Now

- [x] Создать базовый Mini App shell
- [x] Сделать левое меню как ключевой navigation pattern
- [x] Добавить kitchen sections UI
- [x] Подготовить конфигурационную модель под ресторан и роль
- [ ] Разбить текущий `App.tsx` на feature modules
- [ ] Убрать remaining mock-only presentation decisions из shell

## Product tasks

- [ ] Зафиксировать первый ресторан для пилота
- [ ] Зафиксировать точный список кухонных разделов для пилота
- [ ] Определить обязательные роли в первом ресторане
- [ ] Определить owner для обновления stop-list
- [ ] Определить owner для задач смены

## Frontend tasks

- [ ] Вынести `Лента` в отдельный feature module
- [ ] Вынести `Стоп-лист` в отдельный feature module
- [ ] Вынести `Заготовки` в отдельный feature module
- [ ] Вынести `Задачи` в отдельный feature module
- [ ] Вынести `Банкеты` в отдельный feature module
- [ ] Вынести `Обучение` в отдельный feature module
- [ ] Добавить empty/loading/error states for sections
- [ ] Добавить section header actions

## Backend tasks

- [ ] Выбрать backend stack
- [ ] Спроектировать minimal API contracts
- [ ] Реализовать Telegram init data verification
- [ ] Реализовать user -> restaurant -> role mapping
- [ ] Реализовать storage для stop-list
- [ ] Реализовать storage для prep tasks
- [ ] Реализовать storage для shift tasks

## Telegram tasks

- [ ] Создать production bot через `@BotFather`
- [ ] Привязать Mini App URL к боту
- [ ] Определить start flow inside Telegram
- [ ] Определить, как пользователь попадает в нужный workspace

## Deployment tasks

- [ ] Выбрать deployment target for frontend
- [ ] Настроить production URL
- [ ] Проверить Mini App inside Telegram
- [ ] Проверить mobile viewport behavior inside Telegram app

## First pilot tasks

- [ ] Подготовить реальные данные первого ресторана
- [ ] Заполнить stop-list examples
- [ ] Заполнить prep station examples
- [ ] Заполнить shift task templates
- [ ] Заполнить banquet templates
- [ ] Подготовить 2-3 training cards

## Definition of done for first pilot

- [ ] Бот создан
- [ ] Mini App открывается из Telegram
- [ ] Один ресторан имеет свой workspace
- [ ] Кухня видит stop-list, prep, tasks, banquets
- [ ] Основные статусы можно менять
- [ ] Данные не теряются после перезагрузки
