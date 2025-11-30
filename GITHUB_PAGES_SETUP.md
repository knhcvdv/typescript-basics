# Інструкція з налаштування GitHub Pages

## ⚠️ Важливо: Перед запуском workflow потрібно налаштувати GitHub Pages вручну

### Крок 1: Увімкнути GitHub Pages в налаштуваннях репозиторію

1. Перейдіть у ваш репозиторій на GitHub
2. Натисніть на **Settings** (Налаштування)
3. У лівому меню знайдіть розділ **Pages**
4. У секції **Source** оберіть:
   - **Source**: `Deploy from a branch`
   - **Branch**: `feature/tsconfig`
   - **Folder**: `/ (root)`
5. Натисніть **Save**

### Крок 2: Перевірити налаштування

Після налаштування GitHub Pages:
- Ваш сайт буде доступний за адресою: `https://YOUR_USERNAME.github.io/typescript-basics/`
- Або якщо використовується custom domain

### Крок 3: Запустити workflow

Після налаштування Pages, workflow автоматично запуститься при push в гілку `feature/tsconfig`.

Або можна запустити вручну:
1. Перейдіть у вкладку **Actions**
2. Оберіть workflow **Deploy to GitHub Pages**
3. Натисніть **Run workflow**
4. Оберіть гілку `feature/tsconfig`
5. Натисніть **Run workflow**

## Альтернативний спосіб (якщо workflow не працює)

Якщо автоматичний деплой не працює, можна використати ручний деплой через `gh-pages`:

```bash
npm install --save-dev gh-pages
```

Додати в `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d . -b feature/tsconfig"
}
```

Запустити:
```bash
npm run deploy
```

## Структура файлів для GitHub Pages

Переконайтеся, що всі файли знаходяться в кореневій директорії:
- `index.html` ✅
- `styles.css` ✅
- `dist/app.js` ✅
- Всі інші необхідні файли ✅
