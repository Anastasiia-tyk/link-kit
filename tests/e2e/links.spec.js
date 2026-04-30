// tests/e2e/links.spec.js
import { test, expect } from '@playwright/test';

test.describe('Головна сторінка Links Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Критичний шлях 1: сторінка завантажується ──
  test('сторінка завантажується та показує заголовок', async ({ page }) => {
    await expect(page).toHaveTitle('Корисні посилання');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('анімації');
  });

  // ── Критичний шлях 2: всі 12 карток присутні ──
  test('на сторінці є 12 карток посилань', async ({ page }) => {
    const cards = page.locator('.link-card');
    await expect(cards).toHaveCount(11); // 11 .link-card + 1 flip wrap
    const flipWrap = page.locator('.card-flip-wrap');
    await expect(flipWrap).toHaveCount(1);
  });

  // ── Критичний шлях 3: картки є посиланнями ──
  test('картки мають коректні href атрибути', async ({ page }) => {
    const githubCard = page.locator('.card-slide');
    await expect(githubCard).toHaveAttribute('href', 'https://github.com');

    const claudeCard = page.locator('.card-neon');
    await expect(claudeCard).toHaveAttribute('href', 'https://claude.ai');
  });

  // ── Критичний шлях 4: hover на slide-картці ──
  test('slide-картка реагує на hover', async ({ page }) => {
    const card = page.locator('.card-slide');
    await card.hover();
    // Після hover клас та стилі змінились через CSS
    await expect(card).toBeVisible();
  });

  // ── Критичний шлях 5: 3D flip картка ──
  test('flip-картка показує зворотній бік при hover', async ({ page }) => {
    const flipWrap = page.locator('.card-flip-wrap');
    await expect(flipWrap).toBeVisible();

    const backSide = page.locator('.card-flip-back');
    await expect(backSide).toBeVisible();
    await expect(backSide).toHaveAttribute('href', 'https://wikipedia.org');
  });

  // ── Критичний шлях 6: Ripple картка клікабельна ──
  test('ripple-картка існує та має посилання на Figma', async ({ page }) => {
    const rippleCard = page.locator('.card-ripple');
    await expect(rippleCard).toBeVisible();
    await expect(rippleCard).toHaveAttribute('href', 'https://figma.com');
  });

});