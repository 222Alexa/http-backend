# http-backend

Правила сдачи задания:

1. **Важно**: в рамках этого ДЗ можно использовать npm (а значит, никакого `yarn.lock` в репозитории быть не должно)
1. Frontend должен собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor
1. В README.md должен быть размещён бейджик сборки и ссылка на Github Pages (Heroku для Backend'а)
1. В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты
1. Авто-тесты писать не требуется

**UPD: 04.07.2020 (если вы делали по предыдущей версии - ничего страшного, сдавайте так, как сделали).**

---

### HelpDesk

#### Легенда

Пока backend-разработчик находится в отпуске, вам поручили сделать прототип API для сервиса управления заявками на помощь (можете за себя порадоваться, так недалеко и до fullstack'а), к которому вам и нужно будет в дальнейшем прикруить frontend.

#### Описание

Для хранения данных мы будем оперировать следующими структурами:
```javascript
Ticket {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    status // boolean - сделано или нет
    created // дата создания (timestamp)
}

TicketFull {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    description // полное описание
    status // boolean - сделано или нет
    created // дата создания (timestamp)
}
```

Напишите сервер с использованием koa, который работает по следующей схеме:
* GET    ?method=allTickets           - список тикетов
* GET    ?method=ticketById&id=`<id>` - полное описание тикета (где `<id>` - идентификатор тикета)
* POST   ?method=createTicket         - создание тикета (`<id>` генерируется на сервере, в теле формы `name`, `description`, `status`)

Соответственно:
* GET    ?method=allTickets           - массив объектов типа `Ticket` (т.е. без `description`)
* GET    ?method=ticketById&id=`<id>` - объект типа `TicketFull` (т.е. с `description`)
* POST   ?method=createTicket         - в теле запроса форма с полями для объекта типа `Ticket` (с `id` = `null`)

Сервер необходимо развернуть на Heroku. Авто-тесты писать не нужно.

Не забывайте про CORS.

Для упрощения тестирования можете при старте сервера добавлять туда несколько тикетов.

Для того, чтобы с сервера отдавать данные, достаточно в обработчиках koa написать:
```js
const tickets = [];

app.use(async ctx => {
    const { method } = ctx.request.query; // важно: в лекции опечатка, должно быть query

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});
```

Для того, чтобы обработать полученный ответ во Frontend, достаточно вот этого кода:
```js
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
        } catch (e) {
            console.error(e);
        }
    }
});
```

В качестве результата пришлите проверяющему ссылку на Heroku и на ваш GitHub репозиторий.

---

### HelpDesk: Frontend

#### Легенда

API вами написано, пора приступить к своим прямым обязанностям - написанию фронтенда, который будет с этим API работать.

#### Описание

Общий вид списка тикетов (должны загружаться с сервера в формате JSON):

![](https://github.com/222Alexa/ahj-homeworks/raw/master/http/pic/helpdesk.png)

Модальное окно добавления нового тикета (вызывается по кнопке "Добавить тикет" в правом верхнем углу):

![](https://github.com/222Alexa/ahj-homeworks/raw/master/http/pic/helpdesk-2.png)

Модальное окно редактирования существующего тикета (вызвается по кнопке с иконкой "✎" - карандашик):

![](https://github.com/222Alexa/ahj-homeworks/raw/master/http/pic/helpdesk-3.png)

Модальное окно подтверждения удаления (вызывается по кнопке с иконкой "x" - крестик):

![](https://github.com/222Alexa/ahj-homeworks/raw/master/http/pic/helpdesk-4.png)

Для просмотра деталей тикета нужно нажать на самом тикете (но не на контролах - сделано, редактировать или удалить):

![](https://github.com/222Alexa/ahj-homeworks/raw/master/http/pic/helpdesk-5.png)

В качестве бонуса можете отображать какую-нибудь иконку загрузки (см. https://loading.io) на время подгрузки.

Авто-тесты к данной задаче не требуются. Все данные и изменения должны браться/сохраняться на сервере, который вы написали в предыдущей задаче.

В качестве результата пришлите проверяющему ссылку на GitHub репозиторий.

P.S. Подгрузка подробного описания специально организована в виде отдельного запроса, мы прекрасно понимаем, что на малых объёмах информации нет смысла делать её отдельно.

---

### Image Manager

#### Легенда

Настало время докрутить менеджер картинок, который вы делали на протяжении нескольких лекций. Теперь нужно, чтобы все картинки загружались и хранились на сервере. А при удалении удалялись с сервера.

#### Описание

Напишите серверную часть с использованием 'koa' (по аналогии с тем, как это было на лекции), но докрутите туда:
1. Хранение списка картинок - предложите, как отдавать его на клиент (возможно, JSON?)
1. Удаление картинок с сервера (при нажатии на кнопку удалить с клиента)

<details>
<summary>Подсказка</summary>
    
Делайте удаление методом POST: /?method=removeImage&id=`<id>`
</details>

Напоминаем, как он должен выглядеть:

![](https://github.com/222Alexa/ahj-homeworks/raw/master/http/pic/image.png)

Обратите внимание на несколько важных моментов:
1. Ваш менеджер картинок должен по-прежнему поддерживать drag and drop и загрузку по клику
1. Сервер на Heroku в бесплатной редакции "засыпает", при этом удаляются ваши файлы и то, что хранится в памяти (в этом нет ничего страшного, но это не должно быть для вас сюрпризом)
1. Не загружайте больших картинок (более 1Мб): на всех серверах установлены ограничения, мы для упрощения этот момент опускаем

Вам придётся провести исследовательскую работу и выяснить, как удалять файлы с помощью API NodeJS. Надеемся, что вы справитесь с этим, но дадим небольшую подсказку: https://nodejs.org/api/fs.html

Вы можете реализовать развёртывание в удобном для вас формате: либо так, как это было описано на лекции (отдельно для frontend + GitHub Pages и backend + Heroku), либо собрать frontend и настроить backend так, чтобы он обрабатывал frontend так же, как картинки (см. koa-static с лекции) и развернуть единую сборку на Heroku.

Используйте `FormData` для отправки данных. Авто-тесты к данной задаче не нужны.

В качестве результата пришлите проверяющему ссылку на GitHub репозиторий.