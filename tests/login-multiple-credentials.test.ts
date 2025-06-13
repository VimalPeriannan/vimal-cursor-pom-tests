import { test, expect } from '@playwright/test';
const credentials = require('./login-credentials.json');

test.describe('Login with multiple credentials on SauceDemo', () => {
  test.describe.configure({ mode: 'serial' });
  credentials.forEach(({ username, password }) => {
    test(`Login attempt for user: ${username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('[data-test="username"]', username);
      await page.fill('[data-test="password"]', password);
      await page.click('[data-test="login-button"]');
      if (username === 'locked_out_user') {
        await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
      } else {
        await expect(page).toHaveURL(/inventory/);
        // Optionally, log out if login is successful
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
      }
    });
  });
}); 