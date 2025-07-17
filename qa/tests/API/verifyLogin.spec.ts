import { test, expect, APIRequestContext } from '@playwright/test';
import * as constants from '../../utilities/constants';
import * as data from '../../utilities/data';

test.describe('Verify Login API', () => {
  test('POST', async ({ request }) => {
    const response = await request.post(`${constants.API_BASE_URL}/${constants.ENDPOINTS.verifyLogin}`, {
      data: `email=${data.TEST_USER_EMAIL}&password=${data.TEST_USER_PASSWORD}`,
      headers: constants.HEADERS,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('message', data.MESSAGE_USER_FOUND);
  });

  test('DELETE', async ({ request }) => {
    const response = await request.delete(`${constants.API_BASE_URL}/${constants.ENDPOINTS.verifyLogin}`, {
      data: '',
      headers: constants.HEADERS,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 405);
    expect(body).toHaveProperty('message', data.MESSAGE_LOGIN_DELETE);
  });
});