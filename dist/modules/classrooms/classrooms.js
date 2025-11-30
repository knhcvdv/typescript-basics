"use strict";
// ============================================
// Модуль для роботи з аудиторіями
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClassroom = addClassroom;
exports.getClassroomByNumber = getClassroomByNumber;
exports.getClassroomSchedule = getClassroomSchedule;
const data_1 = require("../data/data");
/**
 * Додає аудиторію до системи
 */
function addClassroom(classroom) {
    const exists = data_1.classrooms.some(c => c.number === classroom.number);
    if (exists) {
        console.warn(`Аудиторія ${classroom.number} вже існує`);
        return;
    }
    data_1.classrooms.push(classroom);
    console.log(`Аудиторія ${classroom.number} додана до системи`);
}
/**
 * Отримує аудиторію за номером
 */
function getClassroomByNumber(classroomNumber) {
    return data_1.classrooms.find(c => c.number === classroomNumber);
}
const data_2 = require("../data/data");
function getClassroomSchedule(classroomNumber) {
    return data_2.schedule.filter((lesson) => lesson.classroomNumber === classroomNumber);
}
