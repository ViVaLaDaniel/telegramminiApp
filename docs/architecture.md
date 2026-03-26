# Architecture Notes

## Goal

Собрать одну Telegram Mini App основу, которую можно переиспользовать для:

- разных ресторанов
- разных ролей внутри ресторана
- разных наборов бокового меню

## Current approach

Сейчас UI строится не от захардкоженного ресторана, а от `RestaurantWorkspace`.

Внутри конфигурации лежат:

- `restaurantId`
- `restaurantName`
- `roleName`
- `telegramHandle`
- `pinnedValue`
- `sections`
- `messages`

## Why this matters

Это позволит не плодить отдельные приложения под каждый ресторан. Вместо этого можно:

1. держать один frontend shell
2. подгружать конфиг нужного ресторана
3. подгружать доступные разделы под конкретную роль
4. позже вынести конфиг в backend или CMS

## Near-term next steps

1. Добавить экран выбора workspace по `restaurantId` и `role`.
2. Заменить mock data на JSON-конфигурации или API.
3. Подключить Telegram init data validation на backend.
4. Привязать Mini App к боту и деплою.
5. Добавить реальные сценарии для кухни:
   - стоп-лист
   - заготовки
   - задачи смены
   - банкеты
   - обучение
