// ============================================
// TypeScript Interactive Demo
// Інтерактивність: модальні вікна, scroll, click, анімації, fetch API
// ============================================

// ============================================
// 1. МОДАЛЬНІ ВІКНА
// ============================================
// Функція для відкриття/закриття модального вікна при кліку на кнопки

const modal: HTMLElement | null = document.getElementById('modal');
const openModalBtn: HTMLElement | null = document.getElementById('openModalBtn');
const closeModalBtn: HTMLElement | null = document.getElementById('closeModalBtn');
const closeModalSpan: HTMLElement | null = document.querySelector('.close');

// Функція відкриття модального вікна
function openModal(): void {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокуємо прокрутку фону
    }
}

// Функція закриття модального вікна
function closeModal(): void {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Повертаємо прокрутку
    }
}

// Event listeners для модального вікна
if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (closeModalSpan) {
    closeModalSpan.addEventListener('click', closeModal);
}

// Закриття модального вікна при кліку поза його межами
if (modal) {
    modal.addEventListener('click', (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (target === modal) {
            closeModal();
        }
    });
}

// ============================================
// 2. SCROLL EVENT LISTENERS
// ============================================
// Анімації при прокрутці сторінки та кнопка "Scroll to Top"

const scrollToTopBtn: HTMLElement | null = document.getElementById('scrollToTopBtn');
const scrollBtn: HTMLElement | null = document.getElementById('scrollBtn');
const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card[data-animate]');

// Функція для показу кнопки "Scroll to Top" при прокрутці вниз
function handleScroll(): void {
    const scrollY: number = window.scrollY;
    
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

// Event listener для scroll
window.addEventListener('scroll', handleScroll);

// Функція прокрутки до верху сторінки
function scrollToTop(): void {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listener для кнопки "Scroll to Top"
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

// Функція прокрутки вниз (для демонстрації)
if (scrollBtn) {
    scrollBtn.addEventListener('click', (): void => {
        const aboutSection: HTMLElement | null = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// 3. CLICK EVENT LISTENERS
// ============================================
// Обробка кліків на навігаційні посилання з плавною прокруткою

const navLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link');

navLinks.forEach((link: HTMLElement): void => {
    link.addEventListener('click', (e: MouseEvent): void => {
        e.preventDefault();
        const href: string | null = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const targetId: string = href.substring(1);
            const targetElement: HTMLElement | null = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============================================
// 4. FETCH API - Завантаження даних з JSONPlaceholder
// ============================================

// Інтерфейс для поста з API
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const loadPostsBtn: HTMLElement | null = document.getElementById('loadPostsBtn');
const postsContainer: HTMLElement | null = document.getElementById('postsContainer');
const loadingSpinner: HTMLElement | null = document.getElementById('loadingSpinner');

// Функція для відображення спінера завантаження
function showLoading(): void {
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }
    if (postsContainer) {
        postsContainer.innerHTML = '';
    }
}

// Функція для приховування спінера
function hideLoading(): void {
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
}

// Функція для створення HTML елемента поста
function createPostCard(post: Post): HTMLElement {
    const postCard: HTMLElement = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <small>ID: ${post.id} | User ID: ${post.userId}</small>
    `;
    
    // Додаємо анімацію при кліку на картку
    postCard.addEventListener('click', (): void => {
        postCard.style.transform = 'scale(0.95)';
        setTimeout((): void => {
            postCard.style.transform = 'scale(1)';
        }, 200);
    });
    
    return postCard;
}

// Функція для завантаження та відображення постів
async function loadPosts(): Promise<void> {
    try {
        showLoading();
        
        // Fetch даних з JSONPlaceholder API
        const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=9');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts: Post[] = await response.json();
        
        hideLoading();
        
        // Відображення постів з анімацією
        if (postsContainer) {
            posts.forEach((post: Post, index: number): void => {
                const postCard: HTMLElement = createPostCard(post);
                postCard.style.opacity = '0';
                postCard.style.transform = 'translateY(20px)';
                postsContainer.appendChild(postCard);
                
                // Анімація появи з затримкою
                setTimeout((): void => {
                    postCard.style.transition = 'all 0.5s ease';
                    postCard.style.opacity = '1';
                    postCard.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        // Ховаємо кнопку після завантаження
        if (loadPostsBtn) {
            loadPostsBtn.style.display = 'none';
        }
        
    } catch (error: unknown) {
        hideLoading();
        console.error('Помилка завантаження постів:', error);
        
        if (postsContainer) {
            postsContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: red;">
                    <p>Помилка завантаження даних. Спробуйте пізніше.</p>
                </div>
            `;
        }
    }
}

// Event listener для кнопки завантаження постів
if (loadPostsBtn) {
    loadPostsBtn.addEventListener('click', loadPosts);
}

// ============================================
// 5. АНІМАЦІЇ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
// ============================================

// Ініціалізація анімацій при завантаженні сторінки
window.addEventListener('DOMContentLoaded', (): void => {
    // Перевіряємо видимість карток при завантаженні
    handleScroll();
    
    // Додаємо анімацію для hero секції
    const heroTitle: HTMLElement | null = document.querySelector('.hero-title');
    const heroText: HTMLElement | null = document.querySelector('.hero-text');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInDown 1s ease';
    }
    
    if (heroText) {
        heroText.style.animation = 'fadeInUp 1s ease';
    }
});

// ============================================
// 6. ДОДАТКОВІ ІНТЕРАКТИВНІ ЕФЕКТИ
// ============================================

// Ефект hover для карток постів
document.addEventListener('mouseover', (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('post-card')) {
        target.style.transition = 'transform 0.3s ease';
    }
});

// Плавна прокрутка для всіх внутрішніх посилань
document.querySelectorAll('a[href^="#"]').forEach((anchor: Element): void => {
    anchor.addEventListener('click', function (e: MouseEvent): void {
        e.preventDefault();
        const href: string | null = anchor.getAttribute('href');
        if (href) {
            const target: HTMLElement | null = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

console.log('✅ TypeScript інтерактивність ініціалізована!');
