import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }

  async expectLockedOutError() {
    await expect(this.page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }
} 