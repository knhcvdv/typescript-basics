// ============================================
// Модуль для роботи з scroll подіями та анімаціями
// ============================================
/**
 * Функція для показу кнопки "Scroll to Top" при прокрутці вниз
 */
export function handleScroll() {
    const scrollY = window.scrollY;
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const cards = document.querySelectorAll('.card[data-animate]');
    if (scrollToTopBtn) {
        if (scrollY > 300) {
            scrollToTopBtn.classList.remove('hidden');
        }
        else {
            scrollToTopBtn.classList.add('hidden');
        }
    }
    // Анімація карток при прокрутці
    cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
}
/**
 * Функція прокрутки до верху сторінки
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
/**
 * Функція прокрутки до секції
 */
export function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
/**
 * Ініціалізація scroll функцій
 */
export function initScroll() {
    // Event listener для scroll
    window.addEventListener('scroll', handleScroll);
    // Event listener для кнопки "Scroll to Top"
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    // Функція прокрутки вниз (для демонстрації)
    const scrollBtn = document.getElementById('scrollBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            scrollToSection('about');
        });
    }
}
