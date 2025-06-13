import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('Login to the test web app using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoginSuccess();
  await loginPage.logout();
}); 