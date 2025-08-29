import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LOGIN_DATA } from '../utils/loginData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login Success: should login with valid credentials and show welcome message', async ({ page }) => {
    await loginPage.login(LOGIN_DATA.VALID_USERNAME, LOGIN_DATA.VALID_PASSWORD);
    await expect(loginPage.getUsernameElement()).toContainText(LOGIN_DATA.VALID_USERNAME);
  });

  test('Login Failure A: should show error message with wrong credentials', async ({ page }) => {
    await loginPage.login(LOGIN_DATA.INVALID_USERNAME, LOGIN_DATA.INVALID_PASSWORD);
    await expect(loginPage.errorMessage).toContainText(LOGIN_DATA.ERROR_MESSAGE);
  });

  test('Login Failure B: should show error message with empty credentials', async ({ page }) => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText(LOGIN_DATA.EMPTY_FIELDS_MESSAGE);
  });
});
