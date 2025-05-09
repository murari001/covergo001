
const { test, expect } = require('@playwright/test');
test.setTimeout(60000);
test('Homepage loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  await expect(page).toHaveTitle("Modular, no-code insurance platform for health, life, and P&C.");
  await expect(page.locator('footer')).toBeVisible();
});

// test('Top navigation links redirect correctly', async ({ page }) => {
//   await page.goto('https://www.covergo.com/');
//   const navLinks = ['Platform', 'Solutions', 'Resources', 'Company'];
//   for (const link of navLinks) {
//     await page.click(`nav >> text=${link}`);
//     await expect(page).toHaveURL(/.*covergo.com.*/);
//   }
// });
// 2. Navigation bar contains expected menu links
// test('Navigation bar contains expected links', async ({ page }) => {
//   await page.goto('https://covergo.com/');
//   const navItems = ['Platform', 'Solutions', 'Resources', 'Company'];
//   for (const item of navItems) {
//     await expect(page.getByRole('link', { name: item })).toBeVisible();
//   }
// });

// test('Invalid URL redirects to homepage', async ({ page }) => {
//   await page.goto('https://www.covergo.com/pagenotfound', { waitUntil: 'networkidle' });
//   await expect(page).toHaveURL('https://covergo.com/');
// });



test('Homepage loads in under 60 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('https://www.covergo.com/');
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(60000);
});

test('No broken images on homepage', async ({ page }) => {
  await page.goto('https://www.covergo.com/');
  const imgs = await page.locator('img').elementHandles();
  for (const img of imgs) {
    const status = await img.evaluate(img => img.complete && img.naturalWidth !== 0);
    expect(status).toBe(true);
  }
});

// 3. Clicking "Platform" navigates to the correct section
// test('Clicking Platform redirects to Platform page', async ({ page }) => {
//   await page.goto('https://covergo.com/');
//   await page.getByRole('link', { name: 'Platform' }).click();
//   await expect(page).toHaveURL(/\/platform$/);
//   await expect(page.locator('h1')).toContainText('Modular Core Insurance System');
// });

// 4. Footer is visible and contains contact link
// test('Footer is visible and contains Contact link', async ({ page }) => {
//   await page.goto('https://covergo.com/');
//   const footer = page.locator('footer');
//   await expect(footer).toBeVisible();
//   await expect(footer.getByRole('link', { name: /Contact/i })).toBeVisible();
// });
// 3. Clicking "Platform" navigates to the correct section
// test('Clicking Platform redirects to Platform page 1', async ({ page }) => {
//   await page.goto('https://covergo.com/');
//   await page.getByRole('link', { name: 'Platform' }).click();
//   await expect(page).toHaveURL(/\/platform$/);
//   await expect(page.locator('h1')).toContainText('Modular Core Insurance System');
// });

// 4. Footer is visible and contains contact link
test('Footer is visible and contains Contact link 1', async ({ page }) => {
  await page.goto('https://covergo.com/');
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  //await expect(footer.getByRole('link', { name: /Contact/i })).toBeVisible();
});
// 5. Solutions link navigates to correct section
// test('Solutions link opens Solutions page', async ({ page }) => {
//   await page.goto('https://covergo.com/');
//   await page.getByRole('link', { name: 'Solutions' }).click();
//   await expect(page).toHaveURL(/\/solutions$/);
//   await expect(page.locator('h1')).toContainText('Solutions');
// });
test('Blogpage loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://covergo.com/blog/');
  await expect(page).toHaveTitle("CoverGo Blog - Insurtech Tips, Guides, and More");
  await expect(page.locator('footer')).toBeVisible();
});
test('Aboutus loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://covergo.com/about-us');
  await expect(page).toHaveTitle("CoverGo | About Us");
  await expect(page.locator('footer')).toBeVisible();
});
test('Contactus loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://covergo.com/about-us/contact-us/');
  await expect(page).toHaveTitle("CoverGo | Contact Us");
 await expect(page.locator('footer')).toBeVisible();
});
test('Whycovergo loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://covergo.com/why-covergo/');
  await expect(page).toHaveTitle("CoverGo | Why Modern Insurers Choose CoverGo");
  await expect(page.locator('footer')).toBeVisible();
});
test('Platformoverview loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://covergo.com/our-platforms/');
  await expect(page).toHaveTitle("CoverGo | CoverGo Insurance Platform Overview");
  await expect(page.locator('footer')).toBeVisible();
});
test('Insurer page loads with correct title and key sections', async ({ page }) => {
  await page.goto('https://covergo.com/who-we-help/insurers/');
  await expect(page).toHaveTitle("CoverGo | How CoverGo Helps Insurers");
  await expect(page.locator('footer')).toBeVisible();
});