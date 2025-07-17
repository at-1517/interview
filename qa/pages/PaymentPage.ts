// Page Object Model for Products Page
import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  // Locators
  get nameOnCardInput() { return this.page.locator('input[name="name_on_card"]'); }
  get cardNumberInput() { return this.page.locator('input[name="card_number"]'); }
  get cvcInput() {
    // locator for CVC input field across browsers
    return this.page.locator('input[name="cvc"], input[placeholder*="CVC"], input[id="cvc"]');
  }
  get expiryMonthInput() {
    return this.page.locator('input[name="expiry_month"], input[placeholder*="month"], input[id="expiry_month"]');
  }
  get expiryYearInput() { return this.page.locator('input[name="expiry_year"]'); }
  get submitButton() { return this.page.locator('button#submit'); }

}
