import { test, expect } from '@playwright/test';
import { BASE_URL, API_BASE_URL, HEADERS, ENDPOINTS } from '../../utilities/constants';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import * as data from '../../utilities/data';

// Automate Login UI & API
test.describe('Login UI', () => {
  test('Login with valid credentials - POSITIVE', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();
    homePage.loginLink.click();
    await loginPage.login(data.TEST_USER_EMAIL, data.TEST_USER_PASSWORD);
    await expect(homePage.logoutLink).toBeVisible();

    // API login validation
    const apiResponse = await page.request.post(`${API_BASE_URL}/${ENDPOINTS.verifyLogin}`, {
      data: `email=${data.TEST_USER_EMAIL}&password=${data.TEST_USER_PASSWORD}`,
      headers: HEADERS,
    });
    expect(apiResponse.ok()).toBeTruthy();
    const apiBody = await apiResponse.json();
    expect(apiBody).toHaveProperty('responseCode', 200);
    expect(apiBody).toHaveProperty('message', data.MESSAGE_USER_FOUND);
    console.log('API login response:', apiBody);
  });

  test('Login with invalid password - NEGATIVE', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();
    homePage.loginLink.click();
    await loginPage.login(data.TEST_USER_EMAIL, data.INVALID_PASSWORD);
    // Validate error message for invalid password
    await expect(page.locator('p:has-text("' + data.INVALID_CREDENTIALS_ERROR + '")')).toBeVisible();

    // API validation
    const apiResponse = await page.request.post(`${API_BASE_URL}/${ENDPOINTS.verifyLogin}`, {
      data: `email=${data.TEST_USER_EMAIL}&password=${data.INVALID_PASSWORD}`,
      headers: HEADERS,
    });
    expect(apiResponse.ok()).toBeTruthy();
    const apiBody = await apiResponse.json();
    expect(apiBody).toHaveProperty('responseCode', 404);
    expect(apiBody).toHaveProperty('message', data.MESSAGE_USER_NOT_FOUND);
  });

  test('Login with invalid email - NEGATIVE', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();
    homePage.loginLink.click();
    await loginPage.login(data.INVALID_EMAIL_ADDRESS, data.TEST_USER_PASSWORD);

    // Validate error message for invalid email
    await expect(page.locator('p:has-text("' + data.INVALID_CREDENTIALS_ERROR + '")')).toBeVisible();

    // API validation
    const apiResponse = await page.request.post(`${API_BASE_URL}/${ENDPOINTS.verifyLogin}`, {
      data: `email=${data.INVALID_EMAIL_ADDRESS}&password=${data.TEST_USER_PASSWORD}`,
      headers: HEADERS,
    });
    expect(apiResponse.ok()).toBeTruthy();
    const apiBody = await apiResponse.json();
    expect(apiBody).toHaveProperty('responseCode', 404);
    expect(apiBody).toHaveProperty('message', data.MESSAGE_USER_NOT_FOUND);
  });

  test('Login with missing required fields - NEGATIVE', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();
    homePage.loginLink.click();
    await loginPage.login('', '');
    // Validate required field error
    const validationMessage = await loginPage.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
    expect(validationMessage).toContain(data.MISSING_REQUIRED_FIELDS);

    // API validation
    const apiResponse = await page.request.post(`${API_BASE_URL}/${ENDPOINTS.verifyLogin}`, {
      data: `email=&password=`,
      headers: HEADERS,
    });
    expect(apiResponse.ok()).toBeTruthy();
    const apiBody = await apiResponse.json();
    expect(apiBody).toHaveProperty('responseCode', 404);
    expect(apiBody).toHaveProperty('message', data.MESSAGE_USER_NOT_FOUND);
  });
});
