import { test, expect, APIRequestContext } from '@playwright/test';
import * as constants from '../../utilities/constants';
import * as data from '../../utilities/data';

test.describe('User Account API', () => {
  test('Create, read, update, delete user', async ({ request }) => {
    // each operation can be a separate test
    
    // Create
    const email = `testuser_${Date.now()}@example.com`;
    let response = await request.post(`${constants.API_BASE_URL}/${constants.ENDPOINTS.createAccount}`, {
      data: `name=${encodeURIComponent(data.TEST_USER_NAME)}&email=${encodeURIComponent(email)}&password=${data.TEST_USER_PASSWORD}&title=${data.TITLE_MR}&birth_date=${data.TEST_DAY}&birth_month=${data.TEST_MONTH}&birth_year=${data.TEST_YEAR}&firstname=${encodeURIComponent(data.TEST_USER_NAME.split(' ')[0])}&lastname=${encodeURIComponent(data.TEST_USER_NAME.split(' ')[1])}&company=${encodeURIComponent(data.UPDATED_COMPANY)}&address1=${encodeURIComponent(data.UPDATED_ADDRESS1)}&address2=${encodeURIComponent(data.UPDATED_ADDRESS2)}&country=${encodeURIComponent(data.TEST_COUNTRY)}&zipcode=${data.UPDATED_ZIPCODE}&state=${encodeURIComponent(data.UPDATED_STATE)}&city=${encodeURIComponent(data.UPDATED_CITY)}&mobile_number=${data.TEST_MOBILE}`,
      headers: constants.HEADERS,
    });
    expect(response.ok()).toBeTruthy();
    const createMsg = await response.json();
    expect(createMsg.responseCode).toBe(201);
    expect(createMsg.message).toBe(data.MESSAGE_USER_CREATED);

    // Read
    response = await request.get(`${constants.API_BASE_URL}/${constants.ENDPOINTS.getUserDetailByEmail}?email=${encodeURIComponent(email)}`, {
      headers: constants.HEADERS,
    });
    expect(response.ok()).toBeTruthy();
    const userDetails = await response.json();
    expect(userDetails.responseCode).toBe(200);
    expect(userDetails.user).toHaveProperty('email', email);

    // Update
    response = await request.put(`${constants.API_BASE_URL}/${constants.ENDPOINTS.updateAccount}`, {
      data: `name=${encodeURIComponent(data.UPDATED_USER_NAME)}&email=${encodeURIComponent(email)}&password=${data.TEST_USER_PASSWORD}&title= ${data.TITLE_MR}&birth_date=${data.TEST_DAY}&birth_month=${data.TEST_MONTH}&birth_year=${data.TEST_YEAR}&firstname=${encodeURIComponent(data.UPDATED_USER_NAME.split(' ')[0])}&lastname=${encodeURIComponent(data.UPDATED_USER_NAME.split(' ')[1])}&company=${encodeURIComponent(data.UPDATED_COMPANY)}&address1=${encodeURIComponent(data.UPDATED_ADDRESS1)}&address2=${encodeURIComponent(data.UPDATED_ADDRESS2)}&country=${encodeURIComponent(data.TEST_COUNTRY)}&zipcode=${data.UPDATED_ZIPCODE}&state=${encodeURIComponent(data.UPDATED_STATE)}&city=${encodeURIComponent(data.UPDATED_CITY)}&mobile_number=${data.TEST_MOBILE}`,
      headers: constants.HEADERS,
    });
    expect(response.ok()).toBeTruthy();
    const updateMsg = await response.json();
    expect(updateMsg).toHaveProperty('message', data.MESSAGE_USER_UPDATED);

    // Delete
    response = await request.delete(`${constants.API_BASE_URL}/${constants.ENDPOINTS.deleteAccount}`, {
      data: `email=${encodeURIComponent(email)}&password=${data.TEST_USER_PASSWORD}`,
      headers: constants.HEADERS,
    });
    expect(response.ok()).toBeTruthy();
    const deleteMsg = await response.json();
    expect(deleteMsg).toHaveProperty('message', data.MESSAGE_USER_DELETED);
  });
});
