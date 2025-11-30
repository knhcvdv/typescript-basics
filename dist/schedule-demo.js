"use strict";
// ============================================
// Демонстрація роботи системи управління розкладом
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_1 = require("./schedule");
// ============================================
// ІНІЦІАЛІЗАЦІЯ ДАНИХ
// ============================================
console.log('=== Ініціалізація системи управління розкладом ===\n');
// Додаємо професорів
const prof1 = { id: 1, name: "Іван Петренко", department: "Комп'ютерні науки" };
const prof2 = { id: 2, name: "Марія Коваленко", department: "Математика" };
const prof3 = { id: 3, name: "Олексій Сидоренко", department: "Фізика" };
(0, schedule_1.addProfessor)(prof1);
(0, schedule_1.addProfessor)(prof2);
(0, schedule_1.addProfessor)(prof3);
// Додаємо аудиторії
const room1 = { number: "101", capacity: 30, hasProjector: true };
const room2 = { number: "102", capacity: 25, hasProjector: false };
const room3 = { number: "201", capacity: 50, hasProjector: true };
const room4 = { number: "202", capacity: 40, hasProjector: true };
(0, schedule_1.addClassroom)(room1);
(0, schedule_1.addClassroom)(room2);
(0, schedule_1.addClassroom)(room3);
(0, schedule_1.addClassroom)(room4);
// Додаємо курси
const course1 = { id: 1, name: "Основи програмування", type: "Lecture" };
const course2 = { id: 2, name: "Алгоритми та структури даних", type: "Lab" };
const course3 = { id: 3, name: "Математичний аналіз", type: "Seminar" };
const course4 = { id: 4, name: "Фізика", type: "Practice" };
const course5 = { id: 5, name: "Веб-розробка", type: "Lab" };
(0, schedule_1.addCourse)(course1);
(0, schedule_1.addCourse)(course2);
(0, schedule_1.addCourse)(course3);
(0, schedule_1.addCourse)(course4);
(0, schedule_1.addCourse)(course5);
console.log('\n=== Додавання занять до розкладу ===\n');
// Додаємо заняття
const lesson1 = {
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
};
const lesson2 = {
    courseId: 2,
    professorId: 1,
    classroomNumber: "201",
    dayOfWeek: "Monday",
    timeSlot: "10:15-11:45"
};
const lesson3 = {
    courseId: 3,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Tuesday",
    timeSlot: "8:30-10:00"
};
const lesson4 = {
    courseId: 4,
    professorId: 3,
    classroomNumber: "201",
    dayOfWeek: "Wednesday",
    timeSlot: "12:15-13:45"
};
const lesson5 = {
    courseId: 5,
    professorId: 1,
    classroomNumber: "202",
    dayOfWeek: "Thursday",
    timeSlot: "14:00-15:30"
};
(0, schedule_1.addLesson)(lesson1);
(0, schedule_1.addLesson)(lesson2);
(0, schedule_1.addLesson)(lesson3);
(0, schedule_1.addLesson)(lesson4);
(0, schedule_1.addLesson)(lesson5);
// ============================================
// ТЕСТУВАННЯ КОНФЛІКТІВ
// ============================================
console.log('\n=== Тестування виявлення конфліктів ===\n');
// Спробуємо додати заняття з конфліктом професора (професор вже зайнятий)
const conflictingLesson1 = {
    courseId: 2,
    professorId: 1, // Професор вже має заняття в понеділок 8:30-10:00
    classroomNumber: "202",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
};
(0, schedule_1.addLesson)(conflictingLesson1); // Має вивести попередження про конфлікт
// Спробуємо додати заняття з конфліктом аудиторії
const conflictingLesson2 = {
    courseId: 3,
    professorId: 2,
    classroomNumber: "101", // Аудиторія вже зайнята в понеділок 8:30-10:00
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
};
(0, schedule_1.addLesson)(conflictingLesson2); // Має вивести попередження про конфлікт
// ============================================
// ПОШУК ВІЛЬНИХ АУДИТОРІЙ
// ============================================
console.log('\n=== Пошук вільних аудиторій ===\n');
const availableMonday = (0, schedule_1.findAvailableClassrooms)("8:30-10:00", "Monday");
console.log(`Вільні аудиторії в понеділок 8:30-10:00: ${availableMonday.join(", ")}`);
const availableTuesday = (0, schedule_1.findAvailableClassrooms)("10:15-11:45", "Tuesday");
console.log(`Вільні аудиторії у вівторок 10:15-11:45: ${availableTuesday.join(", ")}`);
// ============================================
// РОЗКЛАД ПРОФЕСОРА
// ============================================
console.log('\n=== Розклад професора ===\n');
const prof1Schedule = (0, schedule_1.getProfessorSchedule)(1);
console.log(`Розклад професора ${prof1.name}:`);
prof1Schedule.forEach(lesson => {
    const course = schedule_1.courses.find(c => c.id === lesson.courseId);
    console.log(`  - ${lesson.dayOfWeek}, ${lesson.timeSlot}, Аудиторія ${lesson.classroomNumber}, ${course?.name || "Невідомий курс"}`);
});
// ============================================
// АНАЛІЗ ВИКОРИСТАННЯ АУДИТОРІЙ
// ============================================
console.log('\n=== Аналіз використання аудиторій ===\n');
const utilization101 = (0, schedule_1.getClassroomUtilization)("101");
console.log(`Використання аудиторії 101: ${utilization101}%`);
const utilization201 = (0, schedule_1.getClassroomUtilization)("201");
console.log(`Використання аудиторії 201: ${utilization201}%`);
const utilization202 = (0, schedule_1.getClassroomUtilization)("202");
console.log(`Використання аудиторії 202: ${utilization202}%`);
// ============================================
// НАЙПОПУЛЯРНІШИЙ ТИП ЗАНЯТЬ
// ============================================
console.log('\n=== Аналіз типів занять ===\n');
const mostPopular = (0, schedule_1.getMostPopularCourseType)();
console.log(`Найпопулярніший тип занять: ${mostPopular}`);
// ============================================
// МОДИФІКАЦІЯ РОЗКЛАДУ
// ============================================
console.log('\n=== Модифікація розкладу ===\n');
// Змінюємо аудиторію для заняття
if (schedule_1.schedule.length > 0 && schedule_1.schedule[0].lessonId) {
    const success = (0, schedule_1.reassignClassroom)(schedule_1.schedule[0].lessonId, "202");
    if (success) {
        console.log("Аудиторію успішно змінено");
    }
}
// Видаляємо заняття
if (schedule_1.schedule.length > 1 && schedule_1.schedule[1].lessonId) {
    (0, schedule_1.cancelLesson)(schedule_1.schedule[1].lessonId);
}
// ============================================
// ПІДСУМКОВА ІНФОРМАЦІЯ
// ============================================
console.log('\n=== Підсумкова інформація ===\n');
console.log(`Загальна кількість професорів: ${schedule_1.professors.length}`);
console.log(`Загальна кількість аудиторій: ${schedule_1.classrooms.length}`);
console.log(`Загальна кількість курсів: ${schedule_1.courses.length}`);
console.log(`Загальна кількість занять у розкладі: ${schedule_1.schedule.length}`);
console.log('\n=== Демонстрація завершена ===');
