// Page Object Model for Home Page
import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Locators
  get loginLink() { return this.page.locator('a[href="/login"]'); }
  get logoutLink() { return this.page.locator('a[href="/logout"]'); }
  get carousel() { return this.page.locator('#slider-carousel'); }

  // Elemenets in the navigation bar can be stored as a separated page/file
}
