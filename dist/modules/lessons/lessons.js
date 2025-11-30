"use strict";
// ============================================
// Модуль для роботи з заняттями
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLesson = addLesson;
exports.findAvailableClassrooms = findAvailableClassrooms;
exports.getProfessorSchedule = getProfessorSchedule;
exports.reassignClassroom = reassignClassroom;
exports.cancelLesson = cancelLesson;
const data_1 = require("../data/data");
const data_2 = require("../data/data");
const data_3 = require("../data/data");
const data_4 = require("../data/data");
const validation_1 = require("../validation/validation");
/**
 * Додає заняття до розкладу, якщо немає конфліктів
 * @returns true якщо заняття додано успішно, false якщо є конфлікт
 */
function addLesson(lesson) {
    // Перевірка валідації заняття
    const conflict = (0, validation_1.validateLesson)(lesson);
    if (conflict !== null) {
        console.warn(`Неможливо додати заняття: конфлікт типу ${conflict.type}`);
        return false;
    }
    // Перевірка існування курсу, професора та аудиторії
    const courseExists = data_2.courses.some(c => c.id === lesson.courseId);
    const professorExists = data_3.professors.some(p => p.id === lesson.professorId);
    const classroomExists = data_4.classrooms.some(c => c.number === lesson.classroomNumber);
    if (!courseExists || !professorExists || !classroomExists) {
        console.warn("Неможливо додати заняття: перевірте існування курсу, професора або аудиторії");
        return false;
    }
    // Додаємо унікальний ID до заняття
    const lessonWithId = {
        ...lesson,
        lessonId: (0, data_1.getNextLessonId)()
    };
    data_1.schedule.push(lessonWithId);
    console.log(`Заняття додано до розкладу (ID: ${lessonWithId.lessonId})`);
    return true;
}
/**
 * Знаходить вільні аудиторії у вказаний час та день
 * @returns масив номерів вільних аудиторій
 */
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    // Знаходимо всі зайняті аудиторії у вказаний час
    const occupiedClassrooms = data_1.schedule
        .filter(lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot)
        .map(lesson => lesson.classroomNumber);
    // Фільтруємо всі аудиторії, виключаючи зайняті
    const availableClassrooms = data_4.classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
    return availableClassrooms;
}
/**
 * Отримує розклад конкретного професора
 * @returns масив занять професора
 */
function getProfessorSchedule(professorId) {
    const professorLessons = data_1.schedule.filter(lesson => lesson.professorId === professorId);
    return professorLessons;
}
/**
 * Змінює аудиторію для заняття, якщо це можливо
 * @returns true якщо аудиторію змінено успішно, false якщо є конфлікт
 */
function reassignClassroom(lessonId, newClassroomNumber) {
    // Знаходимо заняття за ID
    const lessonIndex = data_1.schedule.findIndex(l => l.lessonId === lessonId);
    if (lessonIndex === -1) {
        console.warn(`Заняття з ID ${lessonId} не знайдено`);
        return false;
    }
    const lesson = data_1.schedule[lessonIndex];
    // Перевіряємо існування нової аудиторії
    const classroomExists = data_4.classrooms.some(c => c.number === newClassroomNumber);
    if (!classroomExists) {
        console.warn(`Аудиторія ${newClassroomNumber} не існує`);
        return false;
    }
    // Створюємо копію заняття з новою аудиторією
    const updatedLesson = {
        ...lesson,
        classroomNumber: newClassroomNumber
    };
    // Перевіряємо на конфлікти
    const conflict = (0, validation_1.validateLesson)(updatedLesson);
    if (conflict !== null) {
        console.warn(`Неможливо змінити аудиторію: конфлікт типу ${conflict.type}`);
        return false;
    }
    // Оновлюємо заняття
    data_1.schedule[lessonIndex] = updatedLesson;
    console.log(`Аудиторію для заняття ${lessonId} змінено на ${newClassroomNumber}`);
    return true;
}
/**
 * Видаляє заняття з розкладу
 */
function cancelLesson(lessonId) {
    const lessonIndex = data_1.schedule.findIndex(l => l.lessonId === lessonId);
    if (lessonIndex === -1) {
        console.warn(`Заняття з ID ${lessonId} не знайдено`);
        return;
    }
    data_1.schedule.splice(lessonIndex, 1);
    console.log(`Заняття ${lessonId} видалено з розкладу`);
}
