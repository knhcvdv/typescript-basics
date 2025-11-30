"use strict";
// ============================================
// Модуль для валідації та перевірки конфліктів
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLesson = validateLesson;
const data_1 = require("../data/data");
/**
 * Перевіряє, чи не створює нове заняття конфліктів у розкладі
 * @returns ScheduleConflict якщо є конфлікт, null якщо конфліктів немає
 */
function validateLesson(lesson) {
    // Перевірка конфлікту професора (професор не може бути в двох місцях одночасно)
    const professorConflict = data_1.schedule.find(existingLesson => existingLesson.professorId === lesson.professorId &&
        existingLesson.dayOfWeek === lesson.dayOfWeek &&
        existingLesson.timeSlot === lesson.timeSlot &&
        existingLesson.lessonId !== lesson.lessonId);
    if (professorConflict) {
        return {
            type: "ProfessorConflict",
            lessonDetails: lesson
        };
    }
    // Перевірка конфлікту аудиторії (аудиторія не може бути зайнята двома заняттями одночасно)
    const classroomConflict = data_1.schedule.find(existingLesson => existingLesson.classroomNumber === lesson.classroomNumber &&
        existingLesson.dayOfWeek === lesson.dayOfWeek &&
        existingLesson.timeSlot === lesson.timeSlot &&
        existingLesson.lessonId !== lesson.lessonId);
    if (classroomConflict) {
        return {
            type: "ClassroomConflict",
            lessonDetails: lesson
        };
    }
    return null;
}
