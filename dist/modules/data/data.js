"use strict";
// ============================================
// Масиви даних для системи управління розкладом
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = exports.courses = exports.classrooms = exports.professors = void 0;
exports.getNextLessonId = getNextLessonId;
exports.getCurrentLessonId = getCurrentLessonId;
// Масиви даних
exports.professors = [];
exports.classrooms = [];
exports.courses = [];
exports.schedule = [];
// Лічильник для генерації унікальних ID занять
let lessonIdCounter = 1;
function getNextLessonId() {
    return lessonIdCounter++;
}
function getCurrentLessonId() {
    return lessonIdCounter;
}
