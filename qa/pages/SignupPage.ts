// Page Object Model for Account Creation Page
import { Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  // Locators
  get signupNameInput() { return this.page.locator('input[data-qa="signup-name"]'); }
  get signupEmailInput() { return this.page.locator('input[data-qa="signup-email"]'); }
  get loginButton() { return this.page.locator('a[href="/login"]'); }
  get signupButton() { return this.page.locator('button[data-qa="signup-button"]'); }
  get titleMrRadio() { return this.page.locator('input[id="id_gender1"]'); }
  get passwordInput() { return this.page.locator('input[id="password"]'); }
  get daysSelect() { return this.page.locator('select[id="days"]'); }
  get monthsSelect() { return this.page.locator('select[id="months"]'); }
  get yearsSelect() { return this.page.locator('select[id="years"]'); }
  get newsletterCheckbox() { return this.page.locator('input[id="newsletter"]'); }
  get optinCheckbox() { return this.page.locator('input[id="optin"]'); }
  get firstNameInput() { return this.page.locator('input[id="first_name"]'); }
  get lastNameInput() { return this.page.locator('input[id="last_name"]'); }
  get companyInput() { return this.page.locator('input[data-qa="company"]'); }
  get address1Input() { return this.page.locator('input[data-qa="address"]'); }
  get address2Input() { return this.page.locator('input[data-qa="address2"]'); }
  get countrySelect() { return this.page.locator('select[id="country"]'); }
  get stateInput() { return this.page.locator('input[id="state"]'); }
  get cityInput() { return this.page.locator('input[id="city"]'); }
  get zipcodeInput() { return this.page.locator('input[id="zipcode"]'); }
  get mobileInput() { return this.page.locator('input[id="mobile_number"]'); }
  get createAccountButton() { return this.page.locator('button[data-qa="create-account"]'); }
  get accountCreatedHeader() { return this.page.locator('h2[data-qa="account-created"]'); }
  get accountCreatedMessage() { return (text: string) => this.page.locator(`p:has-text("${text}")`); }
  get continueButton() { return this.page.locator('a[data-qa="continue-button"]'); }
  get logoutLink() { return this.page.locator('a[href="/logout"]'); }
  get emailExistsError() { return (text: string) => this.page.locator(`p:has-text("${text}")`); }
  get invalidEmailError() { return (text: string) => this.page.locator(`p:has-text("${text}")`); }
  get requiredFieldsError() { return (text: string) => this.page.locator(`p:has-text("${text}")`); }
}
