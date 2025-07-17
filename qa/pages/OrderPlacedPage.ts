// Page Object Model for Order Placed Page
import { Page } from '@playwright/test';

export class OrderPlacedPage {
  constructor(private page: Page) {}

  // Locators
  get orderPlacedText() { return this.page.locator('h2[data-qa="order-placed"]'); }
  get orderConfirmationText() { return (text: string) => this.page.locator(`p:has-text('${text}')`); }
  get continueButton() { return this.page.locator('a[data-qa="continue-button"]'); }

}
