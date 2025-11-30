"use strict";
// ============================================
// Модуль для аналізу та звітів
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassroomUtilization = getClassroomUtilization;
exports.getMostPopularCourseType = getMostPopularCourseType;
const data_1 = require("../data/data");
const data_2 = require("../data/data");
const data_3 = require("../data/data");
/**
 * Обчислює відсоток використання аудиторії
 * @returns відсоток використання (0-100)
 */
function getClassroomUtilization(classroomNumber) {
    // Знаходимо аудиторію
    const classroom = data_3.classrooms.find(c => c.number === classroomNumber);
    if (!classroom) {
        console.warn(`Аудиторія ${classroomNumber} не знайдена`);
        return 0;
    }
    // Підраховуємо кількість занять у цій аудиторії
    const lessonsInClassroom = data_1.schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    // Загальна кількість можливих слотів (5 днів * 5 часових слотів = 25)
    const totalPossibleSlots = 25;
    // Обчислюємо відсоток використання
    const utilization = (lessonsInClassroom / totalPossibleSlots) * 100;
    return Math.round(utilization * 100) / 100; // Округлюємо до 2 знаків після коми
}
/**
 * Визначає найпопулярніший тип занять
 * @returns найпопулярніший CourseType
 */
function getMostPopularCourseType() {
    // Підраховуємо кількість занять кожного типу
    const typeCounts = {};
    data_1.schedule.forEach(lesson => {
        const course = data_2.courses.find(c => c.id === lesson.courseId);
        if (course) {
            typeCounts[course.type] = (typeCounts[course.type] || 0) + 1;
        }
    });
    // Знаходимо тип з максимальною кількістю
    let maxCount = 0;
    let mostPopular = "Lecture"; // Значення за замовчуванням
    const courseTypes = ["Lecture", "Seminar", "Lab", "Practice"];
    courseTypes.forEach(type => {
        const count = typeCounts[type] || 0;
        if (count > maxCount) {
            maxCount = count;
            mostPopular = type;
        }
    });
    return mostPopular;
}
