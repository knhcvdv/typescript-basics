"use strict";
// ============================================
// Модуль для роботи з професорами
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProfessor = addProfessor;
exports.getProfessorById = getProfessorById;
const data_1 = require("../data/data");
/**
 * Додає нового професора до масиву професорів
 */
function addProfessor(professor) {
    // Перевірка на унікальність ID
    const existingProfessor = data_1.professors.find(p => p.id === professor.id);
    if (existingProfessor) {
        console.warn(`Професор з ID ${professor.id} вже існує`);
        return;
    }
    data_1.professors.push(professor);
    console.log(`Професор ${professor.name} додано до системи`);
}
/**
 * Отримує професора за ID
 */
function getProfessorById(professorId) {
    return data_1.professors.find(p => p.id === professorId);
}
