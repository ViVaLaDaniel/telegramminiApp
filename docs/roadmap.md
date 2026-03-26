# Roadmap

## Stage 0

Status:

- in progress

Goal:

- собрать рабочий Telegram Mini App shell для кухни

Done:

- React + TypeScript + Vite setup
- Telegram Mini Apps SDK integration
- Telegram-like shell
- left-side menu
- kitchen sections UI

## Stage 1

Status:

- next

Goal:

- превратить mock MVP в usable kitchen tool

Scope:

- real stop-list interactions
- real prep task interactions
- real shift task interactions
- cleaner section-specific UI
- first restaurant config

Exit criteria:

- пользователь может открыть kitchen workspace
- увидеть свои основные секции
- обновить хотя бы stop-list и task statuses

## Stage 2

Status:

- planned

Goal:

- добавить backend truth и auth

Scope:

- Telegram init data verification
- user-to-role mapping
- workspace API
- CRUD endpoints
- persistent storage

Exit criteria:

- frontend получает данные не из mock config
- права пользователя определяются сервером

## Stage 3

Status:

- planned

Goal:

- первый usable pilot для одного ресторана

Scope:

- real restaurant setup
- role assignment
- kitchen-only pilot rollout
- feedback loop
- bugfix pass

Exit criteria:

- один ресторан может реально использовать приложение внутри смены

## Stage 4

Status:

- planned

Goal:

- multi-restaurant and multi-role base

Scope:

- restaurant switch logic
- role-aware navigation
- bar workspace
- floor workspace
- manager workspace

Exit criteria:

- одна кодовая база обслуживает несколько ресторанов и ролей

## Stage 5

Status:

- later

Goal:

- operational scale and product polish

Scope:

- analytics
- notifications
- richer training flows
- incidents and write-offs
- reporting

## Current priority order

1. finish kitchen MVP structure
2. choose backend and auth model
3. connect Mini App to bot and deployment
4. replace mock data with real data
5. onboard first restaurant
