// ============================================
// Система управління розкладом в університеті
// Використання: Union Types, Type Aliases, Arrays
// ============================================

// ============================================
// 1. ВИЗНАЧЕННЯ БАЗОВИХ ТИПІВ
// ============================================

// a) Type alias для днів тижня
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

// b) Union type для часових слотів занять
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";

// c) Type alias для типів занять
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// ============================================
// 2. СТВОРЕННЯ ОСНОВНИХ СТРУКТУР
// ============================================

// a) Type alias для професора
type Professor = {
    id: number;
    name: string;
    department: string;
};

// b) Type alias для аудиторії
type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

// c) Type alias для курсу
type Course = {
    id: number;
    name: string;
    type: CourseType;
};

// d) Type alias для заняття
type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
    lessonId?: number; // Додаємо ID для ідентифікації заняття
};

// ============================================
// 3. МАСИВИ ДАНИХ
// ============================================

let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

// Лічильник для генерації унікальних ID занять
let lessonIdCounter: number = 1;

// ============================================
// 4. ФУНКЦІЇ ДОДАВАННЯ ДАНИХ
// ============================================

/**
 * Додає нового професора до масиву професорів
 */
function addProfessor(professor: Professor): void {
    // Перевірка на унікальність ID
    const existingProfessor: Professor | undefined = professors.find(p => p.id === professor.id);
    if (existingProfessor) {
        console.warn(`Професор з ID ${professor.id} вже існує`);
        return;
    }
    professors.push(professor);
    console.log(`Професор ${professor.name} додано до системи`);
}

/**
 * Додає заняття до розкладу, якщо немає конфліктів
 * @returns true якщо заняття додано успішно, false якщо є конфлікт
 */
function addLesson(lesson: Lesson): boolean {
    // Перевірка валідації заняття
    const conflict: ScheduleConflict | null = validateLesson(lesson);
    if (conflict !== null) {
        console.warn(`Неможливо додати заняття: конфлікт типу ${conflict.type}`);
        return false;
    }

    // Перевірка існування курсу, професора та аудиторії
    const courseExists: boolean = courses.some(c => c.id === lesson.courseId);
    const professorExists: boolean = professors.some(p => p.id === lesson.professorId);
    const classroomExists: boolean = classrooms.some(c => c.number === lesson.classroomNumber);

    if (!courseExists || !professorExists || !classroomExists) {
        console.warn("Неможливо додати заняття: перевірте існування курсу, професора або аудиторії");
        return false;
    }

    // Додаємо унікальний ID до заняття
    const lessonWithId: Lesson = {
        ...lesson,
        lessonId: lessonIdCounter++
    };

    schedule.push(lessonWithId);
    console.log(`Заняття додано до розкладу (ID: ${lessonWithId.lessonId})`);
    return true;
}

// ============================================
// 5. ФУНКЦІЇ ПОШУКУ ТА ФІЛЬТРАЦІЇ
// ============================================

/**
 * Знаходить вільні аудиторії у вказаний час та день
 * @returns масив номерів вільних аудиторій
 */
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    // Знаходимо всі зайняті аудиторії у вказаний час
    const occupiedClassrooms: string[] = schedule
        .filter(lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot)
        .map(lesson => lesson.classroomNumber);

    // Фільтруємо всі аудиторії, виключаючи зайняті
    const availableClassrooms: string[] = classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);

    return availableClassrooms;
}

/**
 * Отримує розклад конкретного професора
 * @returns масив занять професора
 */
function getProfessorSchedule(professorId: number): Lesson[] {
    const professorLessons: Lesson[] = schedule.filter(
        lesson => lesson.professorId === professorId
    );
    return professorLessons;
}

// ============================================
// 6. ОБРОБКА КОНФЛІКТІВ ТА ВАЛІДАЦІЯ
// ============================================

// Type alias для конфлікту розкладу
type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

/**
 * Перевіряє, чи не створює нове заняття конфліктів у розкладі
 * @returns ScheduleConflict якщо є конфлікт, null якщо конфліктів немає
 */
function validateLesson(lesson: Lesson): ScheduleConflict | null {
    // Перевірка конфлікту професора (професор не може бути в двох місцях одночасно)
    const professorConflict: Lesson | undefined = schedule.find(
        existingLesson =>
            existingLesson.professorId === lesson.professorId &&
            existingLesson.dayOfWeek === lesson.dayOfWeek &&
            existingLesson.timeSlot === lesson.timeSlot &&
            existingLesson.lessonId !== lesson.lessonId // Виключаємо поточне заняття при редагуванні
    );

    if (professorConflict) {
        return {
            type: "ProfessorConflict",
            lessonDetails: lesson
        };
    }

    // Перевірка конфлікту аудиторії (аудиторія не може бути зайнята двома заняттями одночасно)
    const classroomConflict: Lesson | undefined = schedule.find(
        existingLesson =>
            existingLesson.classroomNumber === lesson.classroomNumber &&
            existingLesson.dayOfWeek === lesson.dayOfWeek &&
            existingLesson.timeSlot === lesson.timeSlot &&
            existingLesson.lessonId !== lesson.lessonId
    );

    if (classroomConflict) {
        return {
            type: "ClassroomConflict",
            lessonDetails: lesson
        };
    }

    return null;
}

// ============================================
// 7. АНАЛІЗ ТА ЗВІТИ
// ============================================

/**
 * Обчислює відсоток використання аудиторії
 * @returns відсоток використання (0-100)
 */
function getClassroomUtilization(classroomNumber: string): number {
    // Знаходимо аудиторію
    const classroom: Classroom | undefined = classrooms.find(c => c.number === classroomNumber);
    if (!classroom) {
        console.warn(`Аудиторія ${classroomNumber} не знайдена`);
        return 0;
    }

    // Підраховуємо кількість занять у цій аудиторії
    const lessonsInClassroom: number = schedule.filter(
        lesson => lesson.classroomNumber === classroomNumber
    ).length;

    // Загальна кількість можливих слотів (5 днів * 5 часових слотів = 25)
    const totalPossibleSlots: number = 25;
    
    // Обчислюємо відсоток використання
    const utilization: number = (lessonsInClassroom / totalPossibleSlots) * 100;
    
    return Math.round(utilization * 100) / 100; // Округлюємо до 2 знаків після коми
}

/**
 * Визначає найпопулярніший тип занять
 * @returns найпопулярніший CourseType
 */
function getMostPopularCourseType(): CourseType {
    // Підраховуємо кількість занять кожного типу
    const typeCounts: { [key in CourseType]?: number } = {};

    schedule.forEach(lesson => {
        const course: Course | undefined = courses.find(c => c.id === lesson.courseId);
        if (course) {
            typeCounts[course.type] = (typeCounts[course.type] || 0) + 1;
        }
    });

    // Знаходимо тип з максимальною кількістю
    let maxCount: number = 0;
    let mostPopular: CourseType = "Lecture"; // Значення за замовчуванням

    const courseTypes: CourseType[] = ["Lecture", "Seminar", "Lab", "Practice"];
    courseTypes.forEach(type => {
        const count: number = typeCounts[type] || 0;
        if (count > maxCount) {
            maxCount = count;
            mostPopular = type;
        }
    });

    return mostPopular;
}

// ============================================
// 8. МОДИФІКАЦІЯ ДАНИХ
// ============================================

/**
 * Змінює аудиторію для заняття, якщо це можливо
 * @returns true якщо аудиторія змінена успішно, false якщо є конфлікт
 */
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    // Знаходимо заняття за ID
    const lessonIndex: number = schedule.findIndex(l => l.lessonId === lessonId);
    if (lessonIndex === -1) {
        console.warn(`Заняття з ID ${lessonId} не знайдено`);
        return false;
    }

    const lesson: Lesson = schedule[lessonIndex];

    // Перевіряємо існування нової аудиторії
    const classroomExists: boolean = classrooms.some(c => c.number === newClassroomNumber);
    if (!classroomExists) {
        console.warn(`Аудиторія ${newClassroomNumber} не існує`);
        return false;
    }

    // Створюємо копію заняття з новою аудиторією
    const updatedLesson: Lesson = {
        ...lesson,
        classroomNumber: newClassroomNumber
    };

    // Перевіряємо на конфлікти
    const conflict: ScheduleConflict | null = validateLesson(updatedLesson);
    if (conflict !== null) {
        console.warn(`Неможливо змінити аудиторію: конфлікт типу ${conflict.type}`);
        return false;
    }

    // Оновлюємо заняття
    schedule[lessonIndex] = updatedLesson;
    console.log(`Аудиторію для заняття ${lessonId} змінено на ${newClassroomNumber}`);
    return true;
}

/**
 * Видаляє заняття з розкладу
 */
function cancelLesson(lessonId: number): void {
    const lessonIndex: number = schedule.findIndex(l => l.lessonId === lessonId);
    if (lessonIndex === -1) {
        console.warn(`Заняття з ID ${lessonId} не знайдено`);
        return;
    }

    schedule.splice(lessonIndex, 1);
    console.log(`Заняття ${lessonId} видалено з розкладу`);
}

// ============================================
// 9. ДОДАТКОВІ ДОПОМІЖНІ ФУНКЦІЇ
// ============================================

/**
 * Додає аудиторію до системи
 */
function addClassroom(classroom: Classroom): void {
    const exists: boolean = classrooms.some(c => c.number === classroom.number);
    if (exists) {
        console.warn(`Аудиторія ${classroom.number} вже існує`);
        return;
    }
    classrooms.push(classroom);
    console.log(`Аудиторія ${classroom.number} додана до системи`);
}

/**
 * Додає курс до системи
 */
function addCourse(course: Course): void {
    const exists: boolean = courses.some(c => c.id === course.id);
    if (exists) {
        console.warn(`Курс з ID ${course.id} вже існує`);
        return;
    }
    courses.push(course);
    console.log(`Курс ${course.name} додано до системи`);
}

/**
 * Отримує всі заняття для конкретного курсу
 */
function getCourseSchedule(courseId: number): Lesson[] {
    return schedule.filter(lesson => lesson.courseId === courseId);
}

/**
 * Отримує всі заняття в конкретній аудиторії
 */
function getClassroomSchedule(classroomNumber: string): Lesson[] {
    return schedule.filter(lesson => lesson.classroomNumber === classroomNumber);
}

// ============================================
// 10. ЕКСПОРТ ФУНКЦІЙ ТА ТИПІВ
// ============================================

// Експортуємо типи та функції для використання в інших файлах
export type {
    DayOfWeek,
    TimeSlot,
    CourseType,
    Professor,
    Classroom,
    Course,
    Lesson,
    ScheduleConflict
};

export {
    // Функції
    addProfessor,
    addClassroom,
    addCourse,
    addLesson,
    findAvailableClassrooms,
    getProfessorSchedule,
    getCourseSchedule,
    getClassroomSchedule,
    validateLesson,
    getClassroomUtilization,
    getMostPopularCourseType,
    reassignClassroom,
    cancelLesson,
    // Дані
    professors,
    classrooms,
    courses,
    schedule
};
