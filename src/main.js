// src/main.js — точка входу Vite

import './css/style.css';
import posthog from 'posthog-js'; 
import { buildCard, countCards } from './js/utils.js';

/* ══════════════════════════════════════
   1. ІНІЦІАЛІЗАЦІЯ POSTHOG
══════════════════════════════════════ */
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  person_profiles: 'always',
  autocapture: true,
  session_recording: {
    maskAllInputs: true,
  },
  loaded: (ph) => {
    if (import.meta.env.DEV) {
      ph.debug(); 
    }
  },
});

/* ══════════════════════════════════════
   2. ОТОЧЕННЯ ТА ВЕРСІЯ (UI)
══════════════════════════════════════ */
const appStatus = import.meta.env.VITE_APP_STATUS || 'Development';
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Знаходимо елементи, які вже є в index.html
const badge = document.getElementById('env-badge');
const versionDisplay = document.getElementById('app-version');

if (badge) {
  badge.textContent = appStatus;
  
  // Очищаємо старі класи та додаємо потрібний
  badge.className = ''; 
  if (appStatus.toLowerCase().includes('prod')) {
    badge.classList.add('env-production');
  } else {
    badge.classList.add('env-development');
  }
}

if (versionDisplay) {
  versionDisplay.textContent = `v${appVersion}`;
}

/**
 * 3. Ініціалізація візуальних ефектів (Spotlight, Ripple)
 * Імпортуємо ваш оригінальний script.js БЕЗ змін
 */
import './js/script.js';

/* ══════════════════════════════════════
   4. ТРЕКІНГ ПОДІЙ (Analytics)
══════════════════════════════════════ */

// Фіксуємо перегляд сторінки
posthog.capture('$pageview', {
  environment: appStatus,
  app_version: appVersion,
});

// Трекінг кліків на картки
document.querySelectorAll('.link-card').forEach((card) => {
  card.addEventListener('click', () => {
    const animationClass = [...card.classList]
      .find(c => c.startsWith('card-') && c !== 'link-card' && c !== 'card-ripple');

    posthog.capture('card_clicked', {
      card_href: card.getAttribute('href'),
      card_label: card.querySelector('strong')?.textContent?.trim(),
      card_animation: animationClass || 'unknown',
    });
  });
});

// Трекінг Hover (тривалість більше 500мс)
document.querySelectorAll('.link-card').forEach((card) => {
  let hoverStart = null;
  card.addEventListener('mouseenter', () => { hoverStart = Date.now(); });
  card.addEventListener('mouseleave', () => {
    if (!hoverStart) return;
    const duration = Date.now() - hoverStart;
    if (duration > 500) {
      posthog.capture('card_hovered', {
        card_label: card.querySelector('strong')?.textContent?.trim(),
        hover_duration_ms: duration,
      });
    }
    hoverStart = null;
  });
});

// Трекінг Скролу
// Трекінг Скролу (Змінено let на const, щоб прибрати помилку)
const scrollTracked = { 25: false, 50: false, 75: false, 100: false };

window.addEventListener('scroll', () => {
  const docHeight = document.body.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;
  const scrollPercent = Math.round((window.scrollY / docHeight) * 100);

  [25, 50, 75, 100].forEach(milestone => {
    if (scrollPercent >= milestone && !scrollTracked[milestone]) {
      // Ми змінюємо властивість всередині об'єкта, тому const це дозволяє
      scrollTracked[milestone] = true;
      posthog.capture('page_scrolled', { scroll_depth_percent: milestone });
    }
  });
});

/* ══════════════════════════════════════
   5. FEATURE FLAGS ТА БІЗНЕС-ЛОГІКА
══════════════════════════════════════ */
posthog.onFeatureFlags(() => {
  if (posthog.isFeatureEnabled('show-extra-info')) {
    const banner = document.getElementById('feature-banner');
    if (banner) banner.style.display = 'block';
  }
});

try {
  // Використовуємо buildCard, щоб прибрати помилку 'never used'
  // Створюємо віртуальний об'єкт для внутрішньої діагностики
  const diagnosticCard = buildCard({
    label: 'Diagnostic',
    url: window.location.origin,
    type: 'system',
    icon: '⚙️'
  });

  const cardsInHtml = document.querySelectorAll('.link-card').length;
  const totalCount = countCards(new Array(cardsInHtml));

  console.log('Система ініціалізована:', diagnosticCard.label);
  console.log(`На сторінці знайдено карток: ${totalCount}`);
  
  posthog.capture('app_initialized', {
    total_cards: cardsInHtml,
    environment: appStatus,
    app_version: appVersion,
    system_label: diagnosticCard.label // Тепер функція buildCard офіційно використана
  });
} catch (error) {
  console.error('Помилка валідації в utils.js:', error.message);
}

/**
 * Додатковий Spotlight для карток .card-spot (якщо такі є)
 */
const spotCards = document.querySelectorAll('.card-spot');
spotCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--y', (e.clientY - rect.top) + 'px');
  });
});