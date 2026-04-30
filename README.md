# 🔗 Animated Links Kit

[![CI/CD Pipeline](https://github.com/Anastasiia-tyk/link-kit/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Anastasiia-tyk/link-kit/actions/workflows/ci-cd.yml)

> 🌐 **Live Demo:** https://link-kit-nine.vercel.app/

Демонстраційна сторінка з колекцією стилізованих карток-посилань — кожна з унікальною hover-анімацією на чистому HTML/CSS/JS.

## 💡 Ідея MVP

12 карток-посилань із різними анімаційними ефектами:
slide fill, glitch shake, spotlight, border draw, float pulse, icon spin,
typewriter cursor, scale bounce, diagonal wipe, neon pulse, 3D flip і ripple.

Підходить як стартова точка або джерело натхнення для будь-якого фронтенд-проєкту.

## 🛠 Стек технологій

- HTML5
- CSS3 (Custom Properties, @keyframes, clip-path, perspective)
- Vanilla JavaScript
- **Vite** — інструмент збірки та сервер розробки
- **Vitest** — Unit-тестування бізнес-логіки
- **Playwright** — E2E тестування інтерфейсу
- **ESLint + Prettier** — статичний аналіз та форматування коду
- **GitHub Actions** — CI/CD пайплайн
- **Vercel** — хостинг та автоматичний деплой

## 🚀 Як запустити

1. Клонуй репозиторій:

```bash
git clone https://github.com/Anastasiia-tyk/link-kit.git
```

2. Перейди в папку:

```bash
cd animated-links-kit
```

3. Встанови залежності:

```bash
npm install
```

4. Запусти сервер розробки:

```bash
npm run dev
```

Відкрий браузер за адресою `http://localhost:5173`

## 📋 Доступні команди

| Команда             | Опис                         |
| ------------------- | ---------------------------- |
| `npm run dev`       | Запуск сервера розробки      |
| `npm run build`     | Продуктова збірка → `dist/`  |
| `npm run preview`   | Локальний перегляд збірки    |
| `npm run lint`      | Перевірка + виправлення коду |
| `npm run test:unit` | Запуск Unit-тестів           |
| `npm run test:e2e`  | Запуск E2E тестів            |
| `npm run test`      | Всі тести разом              |

## 📁 Структура проєкту

animated-links-kit/
├── .github/
│ └── workflows/
│ └── ci-cd.yml — CI/CD пайплайн
├── css/
│ └── style.css — стилі, анімації, темна тема
├── js/
│ ├── script.js — логіка сторінки
│ └── utils.js — бізнес-логіка (тестується)
├── tests/
│ ├── unit/ — Vitest тести
│ └── e2e/ — Playwright тести
├── index.html — розмітка сторінки
├── vite.config.js — конфігурація збірки
├── eslint.config.js — правила лінтера
└── .prettierrc — правила форматування

## ✨ Анімації

| #   | Клас          | Ефект                                |
| --- | ------------- | ------------------------------------ |
| 1   | `card-slide`  | Зелений фон заїжджає зліва направо   |
| 2   | `card-glitch` | Картка «глічить» і тремтить          |
| 3   | `card-spot`   | Світловий промінь слідує за курсором |
| 4   | `card-border` | Рамка домальовується по периметру    |
| 5   | `card-float`  | Картка злітає вгору та пульсує       |
| 6   | `card-spin`   | Іконка обертається на 360°           |
| 7   | `card-type`   | З'являється миготливий курсор        |
| 8   | `card-bounce` | Пружний відскок при наведенні        |
| 9   | `card-wipe`   | Помаранчевий фон змітає по діагоналі |
| 10  | `card-neon`   | Рамка пульсує з фіолетовим сяйвом    |
| 11  | `card-flip`   | Картка перекидається у 3D            |
| 12  | `card-ripple` | Кола розходяться при кліку           |

## 🎨 Особливості

- Підтримка **темної теми** через `prefers-color-scheme`
- Адаптивна сітка (`auto-fit`, `minmax`) — працює на будь-якому екрані
- Усі анімації — чистий CSS, JS використовується лише де це необхідно
- Легко додати нову картку: скопіюй будь-який `<a class="link-card ...">` і додай свій клас

## 📄 Ліцензія

MIT — використовуй вільно.
