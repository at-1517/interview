import { test, expect } from '@playwright/test';
import { BASE_URL} from '../../utilities/constants';
import { HomePage } from '../../pages/HomePage';
import { SignupPage } from '../../pages/SignupPage';
import * as data from '../../utilities/data';
import * as helpers from '../../utilities/helpers';


// Automate Account Creation UI
test.describe('Account Creation UI', () => {
  test('Create new account - POSITIVE', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();

    //an aletrnative to generating emails directly in the spec
    const generatedEmail = helpers.generateRandomData([{type: "email", count: 1}]);
    const email = generatedEmail.email[0];

    await homePage.loginLink.click();
    await signupPage.signupNameInput.fill(data.TEST_USER_NAME);
    await signupPage.signupEmailInput.fill(email);
    await signupPage.signupButton.click();

    // Fill out registration form fields
    await signupPage.titleMrRadio.waitFor();
    //await signupPage.titleMrRadio.check(); // Title: Mr
    helpers.checkIfNotChecked(signupPage.titleMrRadio);
    await signupPage.passwordInput.fill(data.TEST_USER_PASSWORD);
    await signupPage.daysSelect.selectOption(data.TEST_DAY);
    await signupPage.monthsSelect.selectOption(data.TEST_MONTH);
    await signupPage.yearsSelect.selectOption(data.TEST_YEAR);
    await signupPage.newsletterCheckbox.check();
    await signupPage.optinCheckbox.check();
    await signupPage.firstNameInput.fill(data.TEST_USER_NAME.split(' ')[0]);
    await signupPage.lastNameInput.fill(data.TEST_USER_NAME.split(' ')[1]);
    await signupPage.companyInput.fill(data.TEST_COMPANY);
    await signupPage.address1Input.fill(data.TEST_ADDRESS1);
    await signupPage.address2Input.fill(data.TEST_ADDRESS2);
    await signupPage.countrySelect.selectOption(data.TEST_COUNTRY);
    await signupPage.stateInput.fill(data.TEST_STATE);
    await signupPage.cityInput.fill(data.TEST_CITY);
    await signupPage.zipcodeInput.fill(data.TEST_ZIPCODE);
    await signupPage.mobileInput.fill(data.TEST_MOBILE);

    // Submit registration form
    await signupPage.createAccountButton.click();

    // Verify account creation
    await signupPage.accountCreatedHeader.waitFor();
    await expect(signupPage.accountCreatedHeader).toHaveText(data.MESSAGE_ACCOUNT_CREATED);
    await expect(signupPage.accountCreatedMessage(data.MESSAGE_ACCOUNT_CREATED_TEXT)).toBeVisible();
    
    await signupPage.continueButton.click();
    await expect(homePage.logoutLink).toBeVisible();
  });

  test('Create new account - NEGATIVE - existing user', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const email = data.TEST_USER_EMAIL;

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();

    await homePage.loginLink.click();
    await signupPage.signupNameInput.fill(data.TEST_USER_NAME);
    await signupPage.signupEmailInput.fill(email);
    await signupPage.signupButton.click();
    await expect(signupPage.emailExistsError(data.EMAIL_EXISTS_ERROR)).toBeVisible();
  });

  test('Create new account - NEGATIVE - missing required fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();

    await homePage.loginLink.click();
    await signupPage.signupButton.click();

    // Validate browser tooltip message for required fields
    const requiredValidationMessage = await signupPage.signupEmailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
    expect(requiredValidationMessage.toLowerCase()).toContain(data.MISSING_REQUIRED_FIELDS.toLowerCase());
  });

  test('Create new account - NEGATIVE - invalid email', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();

    await homePage.loginLink.click();
    await signupPage.signupNameInput.fill(data.TEST_USER_NAME);
    await signupPage.signupEmailInput.fill(data.INVALID_EMAIL);
    await signupPage.signupButton.click();
    
    // Validate browser tooltip message for invalid email
    const invalidEmailValidationMessage = await signupPage.signupEmailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
    const actualError = invalidEmailValidationMessage.trim().toLowerCase();
    const possibleErrors = [data.INVALID_EMAIL_ERROR, data.INVALID_EMAIL_ERROR_2, data.INVALID_EMAIL_ERROR_3];
    expect(possibleErrors.some(msg => actualError.includes(msg.toLowerCase()))).toBe(true);
  });
});
