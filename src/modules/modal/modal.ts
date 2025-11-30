// ============================================
// Модуль для роботи з модальними вікнами
// ============================================

/**
 * Функція відкриття модального вікна
 */
export function openModal(modal: HTMLElement | null): void {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокуємо прокрутку фону
    }
}

/**
 * Функція закриття модального вікна
 */
export function closeModal(modal: HTMLElement | null): void {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Повертаємо прокрутку
    }
}

/**
 * Ініціалізація модального вікна
 */
export function initModal(): void {
    const modal: HTMLElement | null = document.getElementById('modal');
    const openModalBtn: HTMLElement | null = document.getElementById('openModalBtn');
    const closeModalBtn: HTMLElement | null = document.getElementById('closeModalBtn');
    const closeModalSpan: HTMLElement | null = document.querySelector('.close');

    // Event listeners для модального вікна
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', (): void => {
            openModal(modal);
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', (): void => {
            closeModal(modal);
        });
    }

    if (closeModalSpan && modal) {
        closeModalSpan.addEventListener('click', (): void => {
            closeModal(modal);
        });
    }

    // Закриття модального вікна при кліку поза його межами
    if (modal) {
        modal.addEventListener('click', (e: MouseEvent): void => {
            const target = e.target as HTMLElement;
            if (target === modal) {
                closeModal(modal);
            }
        });
    }
}
