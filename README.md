# Проектная работа
## тема: Умные ссылки(smartlinks)
Пользователь переходит по ссылки. В зависимости от набора правил, которые могут включать интервалы времени, местоположение пользователя, устпройство, браузер и др. система выполняет редирект на урл, соответствующий  сработавшему правилу.

## Команда для сборки
$ yarn run build

## Команда для сборки образа 
$ yarn run docker-build

## Команда для запуска контейнеров 
$ docker-compose up -d


Перед использованием небходимо заполнить БД правилами. Трубуется подключиться к локальному Postgres 
postgres://postgres:postgres@localhost:5432/smartlinks
и запустить скрипт:

```
INSERT INTO public.path_rules
("path", rules)
VALUES('test2', '{"rules": [{"url": "https://dzen.ru/", "path": "test2", "conditions": [{"id": "CheckUserAgentIncludes", "Includes": "postman"}]}, {"url": "translate.google.com", "path": "test2", "conditions": [{"id": "CheckDateBetween", "After": "2025-05-01", "Before": "2025-05-20"}]}]}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO public.path_rules
("path", rules)
VALUES('test1', '{"rules": [{"url": "https://www.rbc.ru/", "path": "test1", "conditions": [{"id": "CheckDateAfter", "After": "2025-05-20"}]}, {"url": "www.yandex.ru", "path": "test1", "conditions": [{"id": "CheckDateBetween", "After": "2025-05-01", "Before": "2025-05-20"}]}]}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO public.path_rules
("path", rules)
VALUES('test3', '{"rules":[{"url":"https://otus.ru/","path":"test3","conditions":[{"id":"AcceptLanguageIncludes","Includes":"ru-RU"},{"id":"CheckUserAgentIncludes","Includes":"Linux"}]}]}'::jsonb)
ON CONFLICT DO NOTHING;
```

# Запуск локально без контейенеров

## Команда установки библиотек
$ yarn install

## Команда для сборки
$ yarn run build

## Команда для запуска api на локальном порту 5000
$ yarn run start:api:dev

## Команда для запуска resolver на локальном порту 6000
$ yarn run start:api:dev


Для проверки работы системы откройте ссылку в браузере:
http://localhost:5000/test3

должен произайти редирект на сайт https://otus.ru

,если выполнятся оба условия HTTP-запроса GET:
1) Заголовок 'accept-language' содержит строку 'ru-RU'
2) Заголовок 'user-agent' содержит строку 'Linux'









