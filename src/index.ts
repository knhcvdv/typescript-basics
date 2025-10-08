// Базові типи TypeScript
console.log('=== TypeScript Basics ===\n');

// String тип
const userName: string = 'Анна';
const greeting: string = `Привіт, ${userName}!`;

// Number тип
const age: number = 25;
const height: number = 165.5;
const sum: number = age + height;

// Boolean тип
const isStudent: boolean = true;
const isWorking: boolean = false;

// Виведення результатів
console.log('String приклади:');
console.log(`Ім'я: ${userName}`);
console.log(`Привітання: ${greeting}\n`);

console.log('Number приклади:');
console.log(`Вік: ${age} років`);
console.log(`Зріст: ${height} см`);
console.log(`Сума: ${sum}\n`);

console.log('Boolean приклади:');
console.log(`Студент: ${isStudent}`);
console.log(`Працює: ${isWorking}\n`);

// Функція з типізацією
function calculateArea(length: number, width: number): number {
    return length * width;
}

const area: number = calculateArea(10, 5);
console.log(`Площа прямокутника: ${area} кв.м`);

// Масив з типізацією
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['Олексій', 'Марія', 'Дмитро'];

console.log(`\nМасив чисел: ${numbers.join(', ')}`);
console.log(`Масив імен: ${names.join(', ')}`);

// Об'єкт з типізацією
interface Person {
    name: string;
    age: number;
    isActive: boolean;
}

const person: Person = {
    name: 'Іван',
    age: 30,
    isActive: true
};

console.log(`\nОб'єкт Person:`, person);

console.log('\n=== Компіляція завершена успішно! ===');
