## :seedling: <a href="https://test-placeholder.vercel.app/" target="_blank">Posts</a>

приложение позволяет пользователям создавать, редактировать, удалять, добавлять в избранное, сортировать, фильтровать, посты и другое.
В качестве API использован сервис JSONPlaceholder - Free Fake REST API (typicode.com)

## Технологии

![React](https://img.shields.io/badge/-React-61daf8?logo=react&logoColor=black)
![REDUX](https://img.shields.io/badge/-Redux-yellow)
![TypeScript](https://img.shields.io/badge/-TypeScript-blue)
![ReactHookForm](https://img.shields.io/badge/-ReactHookForm-pink)

![MaterialUI](https://img.shields.io/badge/-MaterialUI-blue)
![HTML5](https://img.shields.io/badge/-HTML5-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-f7df1e?logo=javaScript&logoColor=black)

![Webpack](https://img.shields.io/badge/-Webpack-99d6f8?logo=webpack&logoColor=black)
![API](https://img.shields.io/badge/-Api-yellow)
![Axios](https://img.shields.io/badge/-Axios-yellow)
![Redux_Persist](https://img.shields.io/badge/-Redux_Persist-blue)

Clone repositories:

```
git clone https://github.com/LDS196/test-placeholder.git
```

Install dependencies:

```
yarn install
```

Start project:

```
yarn start
```

Deploy project:

```
yarn deploy
```

![image](https://github.com/LDS196/test-placeholder/assets/105713345/6580dfe6-b34f-402b-a53c-06a9317fd6dd)

Тестовое задание:
Работа с данными, полученными из API
Задача: разработать приложение, выводящее посты, фото и задачи из API с возможностью взаимодействия с ними.
Требования:

-   Использовать React.js или Vue.js
-   Использовать любую библиотеку стилей (например, Bootstrap, Material UI, Tailwind и т.д.)
-   Использовать локальное хранилище браузера для хранения необходимых данных (например, localStorage или sessionStorage)
-   Использовать компонентный подход для создания приложения
-   Приложение должно быть отзывчивым и хорошо выглядеть на разных устройствах (мобильные телефоны, планшеты, настольные компьютеры)
-   Для отображения всплывающих окон не использовать стандартный функционал браузера (confirm, alert и т.д.).
-   Чекбоксы и значения выпадающих списков должны быть как-либо стилизованы.
    В качестве API использовать сервис JSONPlaceholder - Free Fake REST API (typicode.com).
    Описание приложения:
    На странице должны присутствовать три вкладки: «Посты», «Фото» и «Задачи». При первом открытии приложения активна вкладка «Посты», что должно явно подсвечиваться. При нажатии на любую другую вкладку она должна стать активной (предыдущая при этом должна перестать быть активной), а контент страницы должен измениться. После перезагрузки страницы открывается вкладка, активная до перезагрузки.

Вкладка «Посты»
Метод API: /posts
Необходимо вывести все посты из API постранично, по умолчанию 10 штук на странице. Должна быть возможность изменить количество выводимых постов (10, 20, 50, 100, все). При перезагрузке изменения должны сохраниться.
Каждый пост состоит из названия, имени пользователя (метод API: /users), его добавившего, основного текста, кнопок «Комментарии», «Редактировать», «Удалить» и «В избранное» (сделать иконками), а также чекбокса, позволяющего выделять несколько постов.
В API есть методы добавления, удаления и редактирования, их нужно использовать. Данные на сервере при этом не изменятся, но на странице изменения должны отобразиться.
Описание кнопок
«Комментарии»: кнопка должна иметь два состояния. По умолчанию кнопка неактивна. При нажатии на неё, она становится активной, а под постом появляются комментарии. У каждого комментария отображается имя отправителя, его e-mail и текст самого комментария. При повторном нажатии кнопки, блок с комментариями скрывается, кнопка снова становится неактивной. Метод API: /comments.
«Редактировать»: при нажатии на кнопку должна появиться возможность изменить текст поста, его название и пользователя, от чьего имени опубликован пост. В режиме редактирования пользователь может сохранить или же отменить внесённые изменения.
«Удалить»: появляется всплывающее окно с подтверждением удаления. При утвердительном ответе пост убирается со страницы, при отрицательном ничего не происходит.
«В избранное»: пост должен как-либо выделиться внешне. После перезагрузки страницы, все избранные посты должны оставаться выделенными. Если нажать на кнопку повторно – пост удаляется из избранных.
Чекбокс: если хотя бы один пост отмечен чекбоксом, появляются две кнопки (к примеру, снизу) – «Удалить» и «В избранное». При нажатии на каждую из них должно всплыть окно с подтверждением. После утвердительного ответа происходит соответствующее массовое действие (удалить или добавить в избранное все отмеченные посты). После отрицательного – ничего не происходит, чекбоксы при этом остаются активными.
Фильтры и сортировка
Сверху должны присутствовать три фильтра: по названию поста, по имени пользователя, по нахождению в списке избранных. Фильтр по имени пользователя реализовать в виде выпадающего списка с возможностью выбора нескольких значений.
Пользователь должен иметь возможность сортировать посты в обе стороны по ID, названию, имени пользователя и по нахождению в списке избранных.
Также, в верхней части необходимо разместить кнопку добавления нового поста. При нажатии на неё появляется всплывающее окно, в котором пользователь может указать название нового поста, его текст, а также выбрать пользователя, от чьего имени пост будет размещён. При сохранении пост добавляется на страницу.

Вкладка «Фото»
Метод API: /albums
На странице нужно постранично отобразить список альбомов. Как и во вкладке «Посты», должна быть возможность изменить количество выводимых альбомов (10, 20, 50, 100, все). При перезагрузке изменения должны сохраниться.
У альбома отображаются только название и имя пользователя, его добавившего.
Рядом с каждым альбомом нужно добавить кнопки «Редактировать», «Удалить», «В избранное» и чекбокс для выделения. Логика взаимодействия с кнопками и чекбоксом аналогична логике из вкладки «Посты».
Также, как и во вкладке «Посты» на странице присутствуют фильтры и сортировка с аналогичной логикой.
При нажатии на название альбома открывается страница с миниатюрами картинок из этого альбома. Метод API: /photos. Под каждой миниатюрой отобразить название. При нажатии на миниатюру появляется всплывающее окно с полноразмерной картинкой. Пользователь может закрыть это всплывающее окно либо крестиком в правом верхнем углу, либо кликом по области вокруг этого окна.

Вкладка «Задачи»
Метод API: /todos
На странице отображается список задач, постранично. Как и в предыдущих вкладках, должна быть возможность изменить количество выводимых задач (10, 20, 50, 100, все). При перезагрузке изменения должны сохраниться.
Задача может быть в двух статусах – выполнена и не выполнена. По умолчанию задачи должны быть отсортированы следующим образом: сначала невыполненные задачи, затем выполненные.
У задачи отображается только название. Если задача выполнена - название перечёркнуто. Пользователь должен иметь возможность переключать статус задачи. Если стоит сортировка по умолчанию (сначала невыполненные, затем выполненные), то при отметке задачи, как выполненной, она перемещается вниз к остальным выполненным задачам.
Рядом с задачей должна присутствовать кнопка редактирования, при нажатии на которую пользователь может отредактировать задачу, а также чекбокс для выделения с возможностью массового удаления задач.
В верхней части страницы необходимо реализовать фильтр и сортировку по названию и статусу, а также кнопку добавления новой задачи.

Оценка задания
Задание будет оцениваться по следующим критериям:

-   Качество кода и его оформление (читаемость, структурированность, использование современных подходов и фреймворков)
-   Работа с API (правильность запросов, обработка ошибок)
-   Функциональность и соответствие требованиям задания
-   Дизайн и пользовательский интерфейс (выбор цветовой схемы, компоновка элементов, адаптивность)

Успехов в выполнении задания!
