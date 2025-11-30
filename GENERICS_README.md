# Базові компоненти інтернет-магазину з Generic типами

## Посилання на файл .ts з кодом:

**GitHub посилання на файл `src/shop.ts`:**
```
https://github.com/knhcvdv/typescript-basics/blob/feature/generics-shop/src/shop.ts
```

## Реалізовані функції:

### Крок 1: Типи товарів
- `BaseProduct` - базовий тип товару
- `Electronics` - тип для електроніки (з полями warranty, brand)
- `Clothing` - тип для одягу (з полями size, color, material)
- `Book` - тип для книг (з полями author, pages, isbn)

### Крок 2: Функції пошуку та фільтрації
- `findProduct<T extends BaseProduct>()` - generic функція пошуку товару за ID
- `filterByPrice<T extends BaseProduct>()` - generic функція фільтрації за максимальною ціною
- `filterByMinPrice<T extends BaseProduct>()` - generic функція фільтрації за мінімальною ціною
- `filterByPriceRange<T extends BaseProduct>()` - generic функція фільтрації за діапазоном цін

### Крок 3: Кошик
- `CartItem<T>` - generic тип для елемента кошика
- `addToCart<T extends BaseProduct>()` - generic функція додавання товару в кошик
- `removeFromCart<T extends BaseProduct>()` - generic функція видалення товару з кошика
- `updateCartQuantity<T extends BaseProduct>()` - generic функція оновлення кількості товару
- `calculateTotal<T extends BaseProduct>()` - generic функція підрахунку загальної вартості
- `getTotalQuantity<T extends BaseProduct>()` - generic функція підрахунку загальної кількості

### Крок 4: Демонстрація
- Створені тестові дані для всіх типів товарів
- Продемонстровано роботу всіх функцій
- Показано, як код обробляє різні типи товарів

## Особливості реалізації:

- Всі функції типобезпечні завдяки Generic типам
- Використовуються тільки функції (без класів)
- Додані коментарі до всіх функцій
- Реалізована перевірка коректності вхідних даних
- Обробка крайових випадків (порожні масиви, невалідні дані)

## Запуск:

```bash
npm run build
npm run shop
```

## Результат виконання:

Демонстрація показує:
- Пошук товарів різних типів
- Фільтрацію товарів за ціною
- Роботу з кошиком (додавання, оновлення, видалення)
- Підрахунок загальної вартості та кількості
