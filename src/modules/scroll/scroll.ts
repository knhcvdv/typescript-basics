// ============================================
// Модуль для роботи з scroll подіями та анімаціями
// ============================================

/**
 * Функція для показу кнопки "Scroll to Top" при прокрутці вниз
 */
export function handleScroll(): void {
    const scrollY: number = window.scrollY;
    const scrollToTopBtn: HTMLElement | null = document.getElementById('scrollToTopBtn');
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card[data-animate]');
    
    if (scrollToTopBtn) {
        if (scrollY > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    }
    
    // Анімація карток при прокрутці
    cards.forEach((card: HTMLElement): void => {
        const cardTop: number = card.getBoundingClientRect().top;
        const windowHeight: number = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
}

/**
 * Функція прокрутки до верху сторінки
 */
export function scrollToTop(): void {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Функція прокрутки до секції
 */
export function scrollToSection(sectionId: string): void {
    const section: HTMLElement | null = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Ініціалізація scroll функцій
 */
export function initScroll(): void {
    // Event listener для scroll
    window.addEventListener('scroll', handleScroll);

    // Event listener для кнопки "Scroll to Top"
    const scrollToTopBtn: HTMLElement | null = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    // Функція прокрутки вниз (для демонстрації)
    const scrollBtn: HTMLElement | null = document.getElementById('scrollBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (): void => {
            scrollToSection('about');
        });
    }
}
