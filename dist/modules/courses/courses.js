"use strict";
// ============================================
// Модуль для роботи з курсами
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCourse = addCourse;
exports.getCourseById = getCourseById;
exports.getCourseSchedule = getCourseSchedule;
const data_1 = require("../data/data");
/**
 * Додає курс до системи
 */
function addCourse(course) {
    const exists = data_1.courses.some(c => c.id === course.id);
    if (exists) {
        console.warn(`Курс з ID ${course.id} вже існує`);
        return;
    }
    data_1.courses.push(course);
    console.log(`Курс ${course.name} додано до системи`);
}
/**
 * Отримує курс за ID
 */
function getCourseById(courseId) {
    return data_1.courses.find(c => c.id === courseId);
}
const data_2 = require("../data/data");
function getCourseSchedule(courseId) {
    return data_2.schedule.filter((lesson) => lesson.courseId === courseId);
}
