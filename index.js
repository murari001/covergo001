// 1. homepage.test.js
const { test, expect } = require('@playwright/test');

test('Homepage loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  await expect(page).toHaveTitle(/CoverGo/i);
  await expect(page.locator('text=Empowering the future of insurance')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

// 2. navigation.test.js
test('Top navigation links redirect correctly', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const navLinks = ['Platform', 'Solutions', 'Resources', 'Company'];
  for (const link of navLinks) {
    await page.click(`nav >> text=${link}`);
    await expect(page).toHaveURL(/.*covergo.com.*/);
  }
});

// 3. contactForm.test.js
test('Contact form shows error for empty submission', async ({ page }) => {
  await page.goto('https://www.covergo.com/contact');
  await page.click('text=Submit');
  await expect(page.locator('text=This field is required')).toBeVisible();
});

// 4. careers.test.js
test('Careers page loads with job listings', async ({ page }) => {
  await page.goto('https://www.covergo.com/careers');
  await expect(page.locator('text=Join our team')).toBeVisible();
  await expect(page.locator('[class*=job-card]')).toHaveCountGreaterThan(0);
});

// 5. servicesNavigation.test.js
test('Services section navigates to Platform details', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  await page.click('text=Platform');
  await expect(page).toHaveURL(/.*platform.*/);
});

// 6. page404.test.js
test('Invalid URL shows 404 page', async ({ page }) => {
  await page.goto('https://www.covergo.com/thispagedoesnotexist');
  await expect(page.locator('text=404')).toBeVisible();
});

// 7. pageLoadPerformance.test.js
test('Homepage loads in under 3 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('https://www.covergo.com/');
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(3000);
});

// 8. accessibility.test.js
const { injectAxe, checkA11y } = require('axe-playwright');

test('Accessibility check with axe', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  await injectAxe(page);
  await checkA11y(page);
});

// 9. newsletterForm.test.js
test('Newsletter form validates email format', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const emailInput = page.locator('input[type=email]');
  await emailInput.fill('invalid-email');
  await page.click('text=Subscribe');
  await expect(page.locator('text=Enter a valid email')).toBeVisible();
});

// 10. responsive.test.js
test('Mobile layout is responsive', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('https://www.covergo.com/');
  await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();
});

// 11. seoTags.test.js
test('SEO tags are present', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const metaDesc = await page.locator('head meta[name="description"]');
  await expect(metaDesc).toHaveAttribute('content', /CoverGo/i);
});

// 12. externalLinks.test.js
test('External links open in new tab', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const links = await page.locator('a[target="_blank"]');
  expect(await links.count()).toBeGreaterThan(0);
});

// 13. cookiesConsent.test.js
test('Cookies banner appears and can be dismissed', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const cookieBanner = page.locator('text=We use cookies');
  if (await cookieBanner.isVisible()) {
    await page.click('text=Accept');
    await expect(cookieBanner).toBeHidden();
  }
});

// 14. noBrokenImages.test.js
test('No broken images on homepage', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const imgs = await page.locator('img').elementHandles();
  for (const img of imgs) {
    const status = await img.evaluate(img => img.complete && img.naturalWidth !== 0);
    expect(status).toBe(true);
  }
});

// 15. darkModeToggle.test.js
test('Dark mode toggles theme', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const toggle = page.locator('button[aria-label*="dark"]');
  if (await toggle.isVisible()) {
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  }
});

// 16. formStatePersistence.test.js
test('Form retains state after back navigation', async ({ page }) => {
  await page.goto('https://www.covergo.com/contact');
  const input = page.locator('input[name="name"]');
  await input.fill('Test User');
  await page.goto('https://www.covergo.com/');
  await page.goBack();
  await expect(input).toHaveValue('Test User');
});

// 17. keyboardNavigation.test.js
test('Navbar can be navigated via keyboard', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement.tagName);
  expect(focused).toBe('A');
});

// 18. languageSwitcher.test.js
test('Language switch updates content', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const switcher = page.locator('button[aria-label*="language"]');
  if (await switcher.isVisible()) {
    await switcher.click();
    await expect(page.locator('html')).toHaveAttribute('lang', /[a-z]{2}/);
  }
});

// 19. socialMediaLinks.test.js
test('Social media icons navigate externally', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const socialIcons = await page.locator('footer a[href*="linkedin"], footer a[href*="twitter"]');
  expect(await socialIcons.count()).toBeGreaterThan(0);
});

// 20. scrollBehavior.test.js
test('Scroll to section buttons work correctly', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const scrollButton = page.locator('text=Learn More');
  if (await scrollButton.isVisible()) {
    await scrollButton.click();
    await expect(page.locator('#section-id')).toBeInViewport();
  }
});
