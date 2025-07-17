// Page Object Model for Products Page
import { Page } from '@playwright/test';

export class ShoppingCartPage {
  constructor(private page: Page) {}

  // Locators
  get checkoutButton() {
    return this.page.locator('a[class="btn btn-default check_out"], a:has-text("Proceed to Checkout"), a[type="button"], a[data-qa="checkout-button"]');
  }
  get paymentLink() { return this.page.locator('a[href="/payment"]'); }

}
