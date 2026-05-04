// src/main.js — точка входу Vite

import './css/style.css';
import posthog from 'posthog-js';
import * as Sentry from '@sentry/browser';
import { buildCard, countCards } from './js/utils.js';

/* ══════════════════════════════════════
   0. ІНІЦІАЛІЗАЦІЯ SENTRY (Лаба 6)
══════════════════════════════════════ */
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  release: `link-kit@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({ maskAllInputs: true }),
  ],
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.category === 'console' && breadcrumb.level === 'log') {
      return null;
    }
    return breadcrumb;
  },
});

// Контекст користувача
Sentry.setUser({
  id:       'student-001',
  email:    'student@university.edu',
  username: 'link_kit_user',
  segment:  'student',
});

Sentry.setTag('app.version',     import.meta.env.VITE_APP_VERSION || '1.0.0');
Sentry.setTag('app.environment', import.meta.env.VITE_APP_ENVIRONMENT || 'development');

Sentry.setContext('app_info', {
  name:        'Link Kit',
  total_cards: 12,
  build_time:  new Date().toISOString(),
});

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

/* ══════════════════════════════════════
   6. SENTRY DEMO КНОПКИ (Лаба 6)
══════════════════════════════════════ */
const breakBtn    = document.getElementById('break-btn');
const handledBtn  = document.getElementById('handled-error-btn');
const logoutBtn   = document.getElementById('logout-btn');
const errorStatus = document.getElementById('error-status');

// Кнопка 1: необроблена помилка
if (breakBtn) {
  breakBtn.addEventListener('click', () => {
    Sentry.addBreadcrumb({
      message:  'User clicked "Break the world" button',
      category: 'user.action',
      level:    'warning',
      data: { button_id: 'break-btn', timestamp: new Date().toISOString() },
    });
    posthog.capture('error_triggered_intentionally', {
      error_type: 'unhandled_exception',
      trigger:    'break_the_world_button',
    });
    throw new Error(
      `Sentry Test Error: Link Kit deliberately broken! ` +
      `User: student@university.edu | Time: ${new Date().toISOString()}`
    );
  });
}

// Кнопка 2: оброблена помилка
if (handledBtn) {
  handledBtn.addEventListener('click', () => {
    try {
      JSON.parse('{ invalid json :::');
    } catch (err) {
      Sentry.addBreadcrumb({
        message:  'JSON parsing failed in demo',
        category: 'error.handled',
        level:    'error',
        data: { attempted_input: '{ invalid json :::' },
      });
      Sentry.captureException(err, {
        tags:  { error_type: 'json_parse_error', handled: 'true' },
        extra: { context: 'handled_error_demo' },
      });
      Sentry.captureMessage('Handled JSON parse error — demo button clicked', 'warning');
      if (errorStatus) {
        errorStatus.textContent = '⚠️ Помилку перехоплено та відправлено в Sentry!';
        errorStatus.style.color = '#f59e0b';
        setTimeout(() => { errorStatus.textContent = ''; }, 3000);
      }
    }
  });
}

// Кнопка 3: logout / очищення контексту
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    Sentry.setUser(null);
    posthog.reset();
    if (errorStatus) {
      errorStatus.textContent = '🚪 Контекст користувача очищено в Sentry та PostHog';
      errorStatus.style.color = '#6b7280';
      setTimeout(() => {
        errorStatus.textContent = '';
        Sentry.setUser({ id: 'student-001', email: 'student@university.edu', segment: 'student' });
      }, 3000);
    }
  });
}

// Sentry — підтверджуємо успішний старт
Sentry.captureMessage('Link Kit initialized successfully', 'info');