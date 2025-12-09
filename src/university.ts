// ============================================
// Система управління навчальним процесом університету
// Використання Enum типів у TypeScript
// ============================================

// ============================================
// ENUM ТИПИ
// ============================================

/**
 * Статус студента
 */
enum StudentStatus {
    Active = 'Active',
    Academic_Leave = 'Academic_Leave',
    Graduated = 'Graduated',
    Expelled = 'Expelled'
}

/**
 * Тип курсу
 */
enum CourseType {
    Mandatory = 'Mandatory',
    Optional = 'Optional',
    Special = 'Special'
}

/**
 * Семестр навчання
 */
enum Semester {
    First = 'First',
    Second = 'Second'
}

/**
 * Оцінки
 */
enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

/**
 * Факультети університету
 */
enum Faculty {
    Computer_Science = 'Computer_Science',
    Economics = 'Economics',
    Law = 'Law',
    Engineering = 'Engineering'
}

// ============================================
// ІНТЕРФЕЙСИ
// ============================================

/**
 * Інтерфейс студента
 */
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

/**
 * Інтерфейс курсу
 */
interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

/**
 * Інтерфейс оцінки
 * Примітка: В TypeScript неможливо мати Enum та Interface з однаковою назвою.
 * Використовуємо type alias GradeRecord для запису про оцінку,
 * а Enum Grade - для значень оцінок.
 * В завданні вказано "interface Grade", але це створює конфлікт з Enum Grade.
 */
interface GradeRecord {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}

/**
 * Інтерфейс реєстрації студента на курс
 */
interface CourseRegistration {
    studentId: number;
    courseId: number;
    registrationDate: Date;
}

// ============================================
// КЛАС СИСТЕМИ УПРАВЛІННЯ
// ============================================

/**
 * Клас для управління навчальним процесом університету
 */
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeRecord[] = [];
    private registrations: CourseRegistration[] = [];
    private studentIdCounter: number = 1;
    private courseIdCounter: number = 1;

    /**
     * Записує студента в університет
     * @param studentData - дані студента без ID
     * @returns створений студент з ID
     */
    enrollStudent(studentData: Omit<Student, 'id'>): Student {
        // Валідація даних
        if (!studentData.fullName || studentData.fullName.trim() === '') {
            throw new Error('ПІБ студента не може бути порожнім');
        }

        if (studentData.year < 1 || studentData.year > 6) {
            throw new Error('Рік навчання повинен бути від 1 до 6');
        }

        if (!studentData.groupNumber || studentData.groupNumber.trim() === '') {
            throw new Error('Номер групи не може бути порожнім');
        }

        const newStudent: Student = {
            id: this.studentIdCounter++,
            ...studentData,
            status: StudentStatus.Active
        };

        this.students.push(newStudent);
        console.log(`Студент ${newStudent.fullName} зарахований до університету (ID: ${newStudent.id})`);
        return newStudent;
    }

    /**
     * Реєструє студента на курс
     * @param studentId - ID студента
     * @param courseId - ID курсу
     */
    registerForCourse(studentId: number, courseId: number): void {
        // Перевірка існування студента
        const student: Student | undefined = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error(`Студент з ID ${studentId} не знайдено`);
        }

        // Перевірка статусу студента
        if (student.status !== StudentStatus.Active) {
            throw new Error(`Студент ${student.fullName} не може реєструватися на курси. Статус: ${student.status}`);
        }

        // Перевірка існування курсу
        const course: Course | undefined = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error(`Курс з ID ${courseId} не знайдено`);
        }

        // Перевірка відповідності факультету
        if (student.faculty !== course.faculty) {
            throw new Error(`Курс "${course.name}" призначений для факультету ${course.faculty}, а студент навчається на ${student.faculty}`);
        }

        // Перевірка чи вже зареєстрований
        const existingRegistration: CourseRegistration | undefined = this.registrations.find(
            r => r.studentId === studentId && r.courseId === courseId
        );
        if (existingRegistration) {
            throw new Error(`Студент вже зареєстрований на курс "${course.name}"`);
        }

        // Перевірка кількості місць
        const registeredCount: number = this.registrations.filter(r => r.courseId === courseId).length;
        if (registeredCount >= course.maxStudents) {
            throw new Error(`Курс "${course.name}" вже заповнений (${course.maxStudents} студентів)`);
        }

        // Реєстрація
        const registration: CourseRegistration = {
            studentId,
            courseId,
            registrationDate: new Date()
        };

        this.registrations.push(registration);
        console.log(`Студент ${student.fullName} зареєстрований на курс "${course.name}"`);
    }

    /**
     * Виставляє оцінку студенту за курс
     * @param studentId - ID студента
     * @param courseId - ID курсу
     * @param grade - оцінка
     */
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        // Перевірка існування студента
        const student: Student | undefined = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error(`Студент з ID ${studentId} не знайдено`);
        }

        // Перевірка існування курсу
        const course: Course | undefined = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error(`Курс з ID ${courseId} не знайдено`);
        }

        // Перевірка реєстрації на курс
        const registration: CourseRegistration | undefined = this.registrations.find(
            r => r.studentId === studentId && r.courseId === courseId
        );
        if (!registration) {
            throw new Error(`Студент ${student.fullName} не зареєстрований на курс "${course.name}"`);
        }

        // Перевірка чи оцінка вже виставлена
        const existingGrade: GradeRecord | undefined = this.grades.find(
            g => g.studentId === studentId && g.courseId === courseId && g.semester === course.semester
        );
        if (existingGrade) {
            throw new Error(`Оцінка за курс "${course.name}" вже виставлена`);
        }

        // Створення запису про оцінку
        const gradeRecord: GradeRecord = {
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        };

        this.grades.push(gradeRecord);
        console.log(`Студенту ${student.fullName} виставлено оцінку ${grade} за курс "${course.name}"`);
    }

    /**
     * Оновлює статус студента
     * @param studentId - ID студента
     * @param newStatus - новий статус
     */
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student: Student | undefined = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error(`Студент з ID ${studentId} не знайдено`);
        }

        // Валідація зміни статусу
        if (student.status === StudentStatus.Graduated && newStatus !== StudentStatus.Graduated) {
            throw new Error('Не можна змінити статус випускника');
        }

        if (student.status === StudentStatus.Expelled && newStatus !== StudentStatus.Expelled) {
            throw new Error('Не можна змінити статус відрахованого студента');
        }

        const oldStatus: StudentStatus = student.status;
        student.status = newStatus;

        console.log(`Статус студента ${student.fullName} змінено з ${oldStatus} на ${newStatus}`);
    }

    /**
     * Отримує список студентів за факультетом
     * @param faculty - факультет
     * @returns масив студентів
     */
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter((student: Student) => student.faculty === faculty);
    }

    /**
     * Отримує всі оцінки студента
     * @param studentId - ID студента
     * @returns масив оцінок
     */
    getStudentGrades(studentId: number): GradeRecord[] {
        const student: Student | undefined = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error(`Студент з ID ${studentId} не знайдено`);
        }

        return this.grades.filter((grade: GradeRecord) => grade.studentId === studentId);
    }

    /**
     * Отримує доступні курси для факультету та семестру
     * @param faculty - факультет
     * @param semester - семестр
     * @returns масив доступних курсів
     */
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter((course: Course) => {
            // Перевірка факультету та семестру
            if (course.faculty !== faculty || course.semester !== semester) {
                return false;
            }

            // Перевірка наявності вільних місць
            const registeredCount: number = this.registrations.filter(
                r => r.courseId === course.id
            ).length;

            return registeredCount < course.maxStudents;
        });
    }

    /**
     * Обчислює середній бал студента
     * @param studentId - ID студента
     * @returns середній бал
     */
    calculateAverageGrade(studentId: number): number {
        const studentGrades: GradeRecord[] = this.getStudentGrades(studentId);

        if (studentGrades.length === 0) {
            return 0;
        }

        const sum: number = studentGrades.reduce(
            (total: number, gradeRecord: GradeRecord) => total + gradeRecord.grade,
            0
        );

        const average: number = sum / studentGrades.length;
        return Math.round(average * 100) / 100; // Округлення до 2 знаків
    }

    /**
     * Отримує список відмінників по факультету
     * @param faculty - факультет
     * @returns масив студентів-відмінників
     */
    getHonorStudents(faculty: Faculty): Student[] {
        const facultyStudents: Student[] = this.getStudentsByFaculty(faculty);

        return facultyStudents.filter((student: Student) => {
            if (student.status !== StudentStatus.Active) {
                return false;
            }

            const averageGrade: number = this.calculateAverageGrade(student.id);
            return averageGrade >= Grade.Excellent && averageGrade > 0;
        });
    }

    /**
     * Додає курс до системи
     * @param courseData - дані курсу без ID
     * @returns створений курс з ID
     */
    addCourse(courseData: Omit<Course, 'id'>): Course {
        // Валідація даних
        if (!courseData.name || courseData.name.trim() === '') {
            throw new Error('Назва курсу не може бути порожньою');
        }

        if (courseData.credits <= 0) {
            throw new Error('Кількість кредитів повинна бути більше 0');
        }

        if (courseData.maxStudents <= 0) {
            throw new Error('Максимальна кількість студентів повинна бути більше 0');
        }

        const newCourse: Course = {
            id: this.courseIdCounter++,
            ...courseData
        };

        this.courses.push(newCourse);
        console.log(`Курс "${newCourse.name}" додано до системи (ID: ${newCourse.id})`);
        return newCourse;
    }

    /**
     * Отримує студента за ID
     * @param studentId - ID студента
     * @returns студент або undefined
     */
    getStudentById(studentId: number): Student | undefined {
        return this.students.find(s => s.id === studentId);
    }

    /**
     * Отримує курс за ID
     * @param courseId - ID курсу
     * @returns курс або undefined
     */
    getCourseById(courseId: number): Course | undefined {
        return this.courses.find(c => c.id === courseId);
    }

    /**
     * Отримує кількість зареєстрованих студентів на курс
     * @param courseId - ID курсу
     * @returns кількість зареєстрованих студентів
     */
    getRegisteredCount(courseId: number): number {
        return this.registrations.filter((r: CourseRegistration) => r.courseId === courseId).length;
    }
}

// ============================================
// ДЕМОНСТРАЦІЯ РОБОТИ СИСТЕМИ
// ============================================

console.log('=== Демонстрація системи управління навчальним процесом ===\n');

// Створення екземпляру системи
const university = new UniversityManagementSystem();

// Запис студентів
console.log('=== Запис студентів ===\n');

const student1 = university.enrollStudent({
    fullName: 'Іван Петренко',
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date('2023-09-01'),
    groupNumber: 'CS-21'
});

const student2 = university.enrollStudent({
    fullName: 'Марія Коваленко',
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date('2023-09-01'),
    groupNumber: 'CS-21'
});

const student3 = university.enrollStudent({
    fullName: 'Олексій Сидоренко',
    faculty: Faculty.Economics,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date('2024-09-01'),
    groupNumber: 'EC-24'
});

// Додавання курсів
console.log('\n=== Додавання курсів ===\n');

const course1 = university.addCourse({
    name: 'Основи програмування',
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
});

const course2 = university.addCourse({
    name: 'Веб-розробка',
    type: CourseType.Optional,
    credits: 3,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 25
});

const course3 = university.addCourse({
    name: 'Бази даних',
    type: CourseType.Mandatory,
    credits: 4,
    semester: Semester.Second,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
});

const course4 = university.addCourse({
    name: 'Мікроекономіка',
    type: CourseType.Mandatory,
    credits: 4,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 40
});

// Реєстрація на курси
console.log('\n=== Реєстрація на курси ===\n');

university.registerForCourse(student1.id, course1.id);
university.registerForCourse(student1.id, course2.id);
university.registerForCourse(student2.id, course1.id);
university.registerForCourse(student2.id, course2.id);
university.registerForCourse(student3.id, course4.id);

// Виставлення оцінок
console.log('\n=== Виставлення оцінок ===\n');

university.setGrade(student1.id, course1.id, Grade.Excellent);
university.setGrade(student1.id, course2.id, Grade.Good);
university.setGrade(student2.id, course1.id, Grade.Excellent);
university.setGrade(student2.id, course2.id, Grade.Excellent);
university.setGrade(student3.id, course4.id, Grade.Good);

// Отримання студентів за факультетом
console.log('\n=== Студенти факультету Computer Science ===\n');

const csStudents = university.getStudentsByFaculty(Faculty.Computer_Science);
csStudents.forEach((student: Student) => {
    console.log(`  - ${student.fullName}, Група: ${student.groupNumber}, Рік: ${student.year}`);
});

// Отримання оцінок студента
console.log('\n=== Оцінки студента ===\n');

const student1Grades = university.getStudentGrades(student1.id);
console.log(`Оцінки студента ${student1.fullName}:`);
student1Grades.forEach((gradeRecord: GradeRecord) => {
    const course = university.getCourseById(gradeRecord.courseId);
    console.log(`  - ${course?.name || 'Невідомий курс'}: ${gradeRecord.grade} (${gradeRecord.semester})`);
});

// Середній бал
console.log('\n=== Середній бал ===\n');

const avg1 = university.calculateAverageGrade(student1.id);
const avg2 = university.calculateAverageGrade(student2.id);
console.log(`Середній бал ${student1.fullName}: ${avg1}`);
console.log(`Середній бал ${student2.fullName}: ${avg2}`);

// Доступні курси
console.log('\n=== Доступні курси ===\n');

const availableCourses = university.getAvailableCourses(Faculty.Computer_Science, Semester.Second);
console.log(`Доступні курси для Computer Science, семестр Second:`);
availableCourses.forEach((course: Course) => {
    const registered = university.getRegisteredCount(course.id);
    console.log(`  - ${course.name} (${registered}/${course.maxStudents} студентів)`);
});

// Відмінники
console.log('\n=== Відмінники ===\n');

const honorStudents = university.getHonorStudents(Faculty.Computer_Science);
console.log(`Відмінники факультету Computer Science:`);
honorStudents.forEach((student: Student) => {
    const avg = university.calculateAverageGrade(student.id);
    console.log(`  - ${student.fullName}: середній бал ${avg}`);
});

// Зміна статусу
console.log('\n=== Зміна статусу студента ===\n');

university.updateStudentStatus(student3.id, StudentStatus.Academic_Leave);
console.log(`Статус студента ${student3.fullName}: ${university.getStudentById(student3.id)?.status}`);

console.log('\n=== Демонстрація завершена ===');
