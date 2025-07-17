// Page Object Model for Account Creation / Login Page
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}
  
  //Locators
  get signupNameInput() { return this.page.locator('input[data-qa="signup-name"]'); }
  get signupEmailInput() { return this.page.locator('input[data-qa="signup-email"]'); }
  get signupButton() { return this.page.locator('button[data-qa="signup-button"]'); }
  get emailInput() { return this.page.locator('input[data-qa="login-email"]'); }
  get passwordInput() { return this.page.locator('input[data-qa="login-password"]'); }
  get loginButton() { return this.page.locator('button[data-qa="login-button"]'); }

  // Actions
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}