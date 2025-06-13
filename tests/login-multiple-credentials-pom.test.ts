import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
const credentials = require('./login-credentials.json');

test.describe('Login with multiple credentials on SauceDemo (POM)', () => {
  test.describe.configure({ mode: 'serial' });
  credentials.forEach(({ username, password }) => {
    test(`Login attempt for user: ${username} (POM)`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(username, password);
      if (username === 'locked_out_user') {
        await loginPage.expectLockedOutError();
      } else {
        await loginPage.expectLoginSuccess();
        await loginPage.logout();
      }
    });
  });
}); 