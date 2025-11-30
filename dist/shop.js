"use strict";
// ============================================
// Базові компоненти інтернет-магазину
// Використання Generic типів у TypeScript
// ============================================
// ============================================
// КРОК 2: ФУНКЦІЇ ДЛЯ ПОШУКУ ТОВАРІВ
// ============================================
/**
 * Знаходить товар за ID
 * @param products - масив товарів
 * @param id - ID товару для пошуку
 * @returns знайдений товар або undefined
 */
const findProduct = (products, id) => {
    if (!Array.isArray(products) || products.length === 0) {
        return undefined;
    }
    if (typeof id !== 'number' || id <= 0) {
        return undefined;
    }
    return products.find((product) => product.id === id);
};
/**
 * Фільтрує товари за максимальною ціною
 * @param products - масив товарів
 * @param maxPrice - максимальна ціна
 * @returns масив товарів, що відповідають критерію
 */
const filterByPrice = (products, maxPrice) => {
    if (!Array.isArray(products)) {
        return [];
    }
    if (typeof maxPrice !== 'number' || maxPrice < 0) {
        return [];
    }
    return products.filter((product) => product.price <= maxPrice && product.inStock);
};
/**
 * Фільтрує товари за мінімальною ціною
 * @param products - масив товарів
 * @param minPrice - мінімальна ціна
 * @returns масив товарів, що відповідають критерію
 */
const filterByMinPrice = (products, minPrice) => {
    if (!Array.isArray(products)) {
        return [];
    }
    if (typeof minPrice !== 'number' || minPrice < 0) {
        return [];
    }
    return products.filter((product) => product.price >= minPrice && product.inStock);
};
/**
 * Фільтрує товари за діапазоном цін
 * @param products - масив товарів
 * @param minPrice - мінімальна ціна
 * @param maxPrice - максимальна ціна
 * @returns масив товарів, що відповідають критерію
 */
const filterByPriceRange = (products, minPrice, maxPrice) => {
    if (!Array.isArray(products)) {
        return [];
    }
    if (typeof minPrice !== 'number' || typeof maxPrice !== 'number') {
        return [];
    }
    if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
        return [];
    }
    return products.filter((product) => product.price >= minPrice && product.price <= maxPrice && product.inStock);
};
/**
 * Додає товар в кошик
 * @param cart - поточний кошик
 * @param product - товар для додавання
 * @param quantity - кількість товару
 * @returns оновлений кошик
 */
const addToCart = (cart, product, quantity) => {
    if (!Array.isArray(cart)) {
        return [];
    }
    if (!product || typeof quantity !== 'number' || quantity <= 0) {
        return cart;
    }
    if (!product.inStock) {
        console.warn(`Товар "${product.name}" недоступний на складі`);
        return cart;
    }
    // Перевіряємо, чи товар вже є в кошику
    const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingItemIndex !== -1) {
        // Якщо товар вже є, збільшуємо кількість
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
    }
    else {
        // Якщо товару немає, додаємо новий елемент
        return [...cart, { product, quantity }];
    }
};
/**
 * Видаляє товар з кошика
 * @param cart - поточний кошик
 * @param productId - ID товару для видалення
 * @returns оновлений кошик
 */
const removeFromCart = (cart, productId) => {
    if (!Array.isArray(cart)) {
        return [];
    }
    if (typeof productId !== 'number' || productId <= 0) {
        return cart;
    }
    return cart.filter((item) => item.product.id !== productId);
};
/**
 * Оновлює кількість товару в кошику
 * @param cart - поточний кошик
 * @param productId - ID товару
 * @param quantity - нова кількість
 * @returns оновлений кошик
 */
const updateCartQuantity = (cart, productId, quantity) => {
    if (!Array.isArray(cart)) {
        return [];
    }
    if (typeof productId !== 'number' || productId <= 0) {
        return cart;
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
        return removeFromCart(cart, productId);
    }
    return cart.map((item) => item.product.id === productId ? { ...item, quantity } : item);
};
/**
 * Підраховує загальну вартість кошика
 * @param cart - кошик з товарами
 * @returns загальна вартість
 */
const calculateTotal = (cart) => {
    if (!Array.isArray(cart) || cart.length === 0) {
        return 0;
    }
    return cart.reduce((total, item) => {
        const itemTotal = item.product.price * item.quantity;
        return total + itemTotal;
    }, 0);
};
/**
 * Підраховує загальну кількість товарів у кошику
 * @param cart - кошик з товарами
 * @returns загальна кількість товарів
 */
const getTotalQuantity = (cart) => {
    if (!Array.isArray(cart) || cart.length === 0) {
        return 0;
    }
    return cart.reduce((total, item) => total + item.quantity, 0);
};
// ============================================
// КРОК 4: ВИКОРИСТАННЯ ФУНКЦІЙ
// ============================================
console.log('=== Демонстрація роботи інтернет-магазину ===\n');
// Створення тестових даних для електроніки
const electronics = [
    {
        id: 1,
        name: 'Смартфон Samsung Galaxy',
        price: 15000,
        description: 'Сучасний смартфон з потужним процесором',
        inStock: true,
        category: 'electronics',
        warranty: 24,
        brand: 'Samsung'
    },
    {
        id: 2,
        name: 'Ноутбук Dell',
        price: 25000,
        description: 'Потужний ноутбук для роботи та розваг',
        inStock: true,
        category: 'electronics',
        warranty: 12,
        brand: 'Dell'
    },
    {
        id: 3,
        name: 'Навушники Sony',
        price: 3000,
        description: 'Бездротові навушники з шумопоглинанням',
        inStock: false,
        category: 'electronics',
        warranty: 12,
        brand: 'Sony'
    }
];
// Створення тестових даних для одягу
const clothing = [
    {
        id: 4,
        name: 'Футболка базова',
        price: 500,
        description: 'Зручна базова футболка',
        inStock: true,
        category: 'clothing',
        size: 'M',
        color: 'Білий',
        material: 'Бавовна 100%'
    },
    {
        id: 5,
        name: 'Джинси класичні',
        price: 1200,
        description: 'Класичні джинси прямого крою',
        inStock: true,
        category: 'clothing',
        size: 'L',
        color: 'Синій',
        material: 'Денім'
    },
    {
        id: 6,
        name: 'Куртка зимова',
        price: 3500,
        description: 'Тепла зимова куртка',
        inStock: true,
        category: 'clothing',
        size: 'XL',
        color: 'Чорний',
        material: 'Поліестер'
    }
];
// Створення тестових даних для книг
const books = [
    {
        id: 7,
        name: 'TypeScript для початківців',
        price: 450,
        description: 'Повний посібник з TypeScript',
        inStock: true,
        category: 'book',
        author: 'Іван Петренко',
        pages: 350,
        isbn: '978-5-123456-78-9'
    },
    {
        id: 8,
        name: 'JavaScript: Поглиблений підхід',
        price: 600,
        description: 'Розуміння JavaScript на глибокому рівні',
        inStock: true,
        category: 'book',
        author: 'Марія Коваленко',
        pages: 520,
        isbn: '978-5-987654-32-1'
    }
];
// ============================================
// ДЕМОНСТРАЦІЯ ПОШУКУ ТОВАРІВ
// ============================================
console.log('=== Пошук товарів ===\n');
const phone = findProduct(electronics, 1);
if (phone) {
    console.log(`Знайдено телефон: ${phone.name}, Ціна: ${phone.price} грн, Гарантія: ${phone.warranty} міс.`);
}
const tshirt = findProduct(clothing, 4);
if (tshirt) {
    console.log(`Знайдено футболку: ${tshirt.name}, Розмір: ${tshirt.size}, Колір: ${tshirt.color}`);
}
const book = findProduct(books, 7);
if (book) {
    console.log(`Знайдено книгу: ${book.name}, Автор: ${book.author}, Сторінок: ${book.pages}\n`);
}
// ============================================
// ДЕМОНСТРАЦІЯ ФІЛЬТРАЦІЇ ЗА ЦІНОЮ
// ============================================
console.log('=== Фільтрація товарів за ціною ===\n');
const affordableElectronics = filterByPrice(electronics, 10000);
console.log(`Електроніка до 10000 грн: ${affordableElectronics.length} товарів`);
affordableElectronics.forEach((product) => {
    console.log(`  - ${product.name}: ${product.price} грн`);
});
const affordableClothing = filterByPrice(clothing, 1000);
console.log(`\nОдяг до 1000 грн: ${affordableClothing.length} товарів`);
affordableClothing.forEach((product) => {
    console.log(`  - ${product.name}: ${product.price} грн`);
});
const midRangeBooks = filterByPriceRange(books, 400, 550);
console.log(`\nКниги від 400 до 550 грн: ${midRangeBooks.length} товарів`);
midRangeBooks.forEach((product) => {
    console.log(`  - ${product.name}: ${product.price} грн\n`);
});
// ============================================
// ДЕМОНСТРАЦІЯ РОБОТИ З КОШИКОМ
// ============================================
console.log('=== Робота з кошиком ===\n');
// Створюємо порожній кошик
let cart = [];
// Додаємо товари різних типів
if (phone) {
    cart = addToCart(cart, phone, 1);
    console.log(`Додано в кошик: ${phone.name}`);
}
if (tshirt) {
    cart = addToCart(cart, tshirt, 2);
    console.log(`Додано в кошик: ${tshirt.name} (2 шт.)`);
}
if (book) {
    cart = addToCart(cart, book, 1);
    console.log(`Додано в кошик: ${book.name}`);
}
// Додаємо ще один товар
const jeans = findProduct(clothing, 5);
if (jeans) {
    cart = addToCart(cart, jeans, 1);
    console.log(`Додано в кошик: ${jeans.name}\n`);
}
// Показуємо вміст кошика
console.log('Вміст кошика:');
cart.forEach((item) => {
    console.log(`  - ${item.product.name}: ${item.quantity} шт. x ${item.product.price} грн = ${item.product.price * item.quantity} грн`);
});
// Підраховуємо загальну вартість
const total = calculateTotal(cart);
const totalQuantity = getTotalQuantity(cart);
console.log(`\nЗагальна кількість товарів: ${totalQuantity} шт.`);
console.log(`Загальна вартість: ${total} грн\n`);
// Оновлюємо кількість товару
if (tshirt) {
    cart = updateCartQuantity(cart, tshirt.id, 3);
    console.log(`Оновлено кількість "${tshirt.name}" до 3 шт.`);
}
// Перераховуємо після оновлення
const newTotal = calculateTotal(cart);
console.log(`Нова загальна вартість: ${newTotal} грн\n`);
// Видаляємо товар з кошика
if (book) {
    cart = removeFromCart(cart, book.id);
    console.log(`Видалено з кошика: ${book.name}`);
    const finalTotal = calculateTotal(cart);
    console.log(`Фінальна вартість: ${finalTotal} грн\n`);
}
console.log('=== Демонстрація завершена ===');
