import { expect, test } from '../fixtures/pages';
import { bankTransfer, billingAddress, users } from '../utils/test-data';

test.describe('Checkout', () => {
  test('TC10 - logged-in customer completes checkout with bank transfer', async ({
    loginPage,
    homePage,
    productPage,
    header,
    cartPage,
    checkoutPage,
  }) => {
    // Arrange: log in and put one product in the cart
    await loginPage.loginAsCustomer(users.customer.email, users.customer.password);
    await homePage.goto();
    await homePage.openFirstProduct();
    await productPage.waitForLoaded();
    const name = await productPage.getName();
    await productPage.addToCart(1);

    // Step 1: cart
    await header.openCart();
    await expect(cartPage.productTitles.first()).toContainText(name);
    await cartPage.proceed();

    // Step 2: already signed in
    await checkoutPage.confirmSignedIn();

    // Step 3: billing address
    await checkoutPage.fillBillingAddress(billingAddress);
    await checkoutPage.proceedFromAddress();

    // Step 4: payment
    await checkoutPage.payByBankTransfer(bankTransfer);

    await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  });
});
