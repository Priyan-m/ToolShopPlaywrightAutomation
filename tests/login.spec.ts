import { expect, test } from '../fixtures/pages';
import { users } from '../utils/test-data';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC01 - customer can log in with valid credentials', async ({ page, loginPage, accountPage, header }) => {
    await loginPage.login(users.customer.email, users.customer.password);

    await expect(page).toHaveURL(/\/account/);
    await expect(accountPage.pageTitle).toHaveText('My account');
    await expect(header.userMenu).toContainText(users.customer.fullName);
  });

  test('TC02 - login fails with an invalid password', async ({ page, loginPage }) => {
    await loginPage.login(users.invalid.email, users.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(/invalid email or password/i);
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('TC03 - logged-in customer can sign out', async ({ page, loginPage, header }) => {
    await loginPage.login(users.customer.email, users.customer.password);
    await expect(page).toHaveURL(/\/account/);

    await header.signOut();

    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(header.signInLink).toBeVisible();
  });
});
