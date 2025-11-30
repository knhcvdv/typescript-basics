# Модульна структура інтерактивного додатку

## Посилання на папку з файлами .ts:

**`src/`** - головна папка з усіма TypeScript файлами

## Структура проекту:

```
src/
├── main.ts                    # Головний файл з імпортами всіх модулів
├── types/
│   └── types.ts              # Типи (Post)
└── modules/
    ├── modal/
    │   └── modal.ts          # Модуль для роботи з модальними вікнами
    ├── scroll/
    │   └── scroll.ts         # Модуль для scroll подій та анімацій
    ├── navigation/
    │   └── navigation.ts     # Модуль для навігації та click подій
    ├── fetch/
    │   └── fetch.ts          # Модуль для Fetch API
    └── animations/
        └── animations.ts     # Модуль для анімацій
```

## Опис модулів:

### types/types.ts
Містить типи:
- `Post` - тип для поста з API (userId, id, title, body)

### modules/modal/modal.ts
Функції для роботи з модальними вікнами:
- `openModal()` - відкриття модального вікна
- `closeModal()` - закриття модального вікна
- `initModal()` - ініціалізація модального вікна

### modules/scroll/scroll.ts
Функції для scroll подій:
- `handleScroll()` - обробка прокрутки сторінки
- `scrollToTop()` - прокрутка до верху
- `scrollToSection()` - прокрутка до секції
- `initScroll()` - ініціалізація scroll функцій

### modules/navigation/navigation.ts
Функції для навігації:
- `initNavigation()` - ініціалізація навігаційних посилань
- `initSmoothScroll()` - плавна прокрутка для посилань

### modules/fetch/fetch.ts
Функції для роботи з API:
- `loadPosts()` - завантаження постів з JSONPlaceholder
- `createPostCard()` - створення картки поста
- `showLoading()` / `hideLoading()` - управління спінером
- `initFetch()` - ініціалізація fetch функцій

**Залежності:** імпортує тип `Post` з `types/types.ts`

### modules/animations/animations.ts
Функції для анімацій:
- `initPageAnimations()` - анімації при завантаженні сторінки
- `initHoverEffects()` - hover ефекти для карток

**Залежності:** імпортує `handleScroll` з `modules/scroll/scroll.ts`

### main.ts
Головний файл, який:
- Імпортує всі модулі
- Викликає функції ініціалізації для кожного модуля
- Запускає додаток

## Залежності між модулями:

- `animations.ts` → імпортує `handleScroll` з `scroll.ts`
- `fetch.ts` → імпортує тип `Post` з `types/types.ts`
- `main.ts` → імпортує всі модулі

## Типізація:

Всі функції повністю типізовані:
- Параметри функцій мають явні типи
- Повернуті значення типізовані (void, Promise<void>, HTMLElement, тощо)
- Використовуються примітивні типи TypeScript

## Запуск:

```bash
npm run build
```

Після компіляції файл `dist/main.js` підключається в `index.html`