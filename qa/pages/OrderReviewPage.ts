// Page Object Model for Order Review Page
import { Page } from '@playwright/test';

export class OrderReviewPage {
  constructor(private page: Page) {}

  // Locators
  get paymentLink() {
    return this.page.locator('a[href="/payment"], a:has-text("Payment"), a[data-qa="payment-link"]');
  }
  get checkoutMessage() {
    return this.page.locator('textarea[name="message"], textarea[placeholder*="message"], textarea[id="message"]');
  }
  get submitButton() { return this.page.locator('button#submit'); }
  get orderConfirmationText() { return (text: string) => this.page.locator(`p:has-text('${text}')`); }

}
