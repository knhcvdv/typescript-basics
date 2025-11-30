Система управління розкладом університету
Система для управління розкладом занять, реалізована на TypeScript із використанням union types, type aliases та масивів.

Структура
src/schedule.ts – логіка системи та типи
src/schedule-demo.ts – приклади використання

Основні функції
Типи: DayOfWeek, TimeSlot, CourseType, Professor, Classroom, Course, Lesson
Додавання: addProfessor(), addLesson() з перевіркою конфліктів
Пошук/фільтрація: findAvailableClassrooms(), getProfessorSchedule()
Валідація: validateLesson(), ScheduleConflict
Аналіз: getClassroomUtilization(), getMostPopularCourseType()
Модифікація: reassignClassroom(), cancelLesson()

Запуск
npm run build
node dist/schedule-demo.js

Особливості: повна типізація, обробка помилок і конфліктів, ефективна робота з масивами.