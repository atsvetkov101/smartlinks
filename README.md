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

Для проверки работы системы откройте сслку в браузере:
http://localhost:5000/test3



