import { test, expect } from '@playwright/test';

test('Login to the test web app', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // Fill in username and password
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');

  // Click the login button
  await page.click('button[type="submit"]');

  // Expect a success message to appear
  await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');

  // Optionally, log out
  await page.click('a[href="/logout"]');

  // Confirm logout
  await expect(page.locator('.flash.success')).toContainText('You logged out of the secure area!');
});


