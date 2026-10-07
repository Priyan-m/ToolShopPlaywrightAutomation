import { expect, test } from '../fixtures/pages';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.openFirstProduct();
  });

  test('TC07 - adding a product updates the cart badge', async ({ productPage, header }) => {
    await productPage.waitForLoaded();

    await productPage.addToCart(2);

    await expect(header.cartQuantity).toHaveText('2');
  });

  test('TC08 - cart line total equals unit price x quantity', async ({ productPage, header, cartPage }) => {
    await productPage.waitForLoaded();
    const name = await productPage.getName();
    const unitPrice = await productPage.getUnitPrice();
    await productPage.addToCart(1);

    await header.openCart();
    await expect(cartPage.productTitles.first()).toContainText(name);

    await cartPage.setQuantity(0, 3);

    await expect
      .poll(() => cartPage.getLinePrice(0), { message: 'line price should update to 3 x unit price' })
      .toBeCloseTo(unitPrice * 3, 2);
  });

  test('TC09 - removing the only item empties the cart', async ({ productPage, header, cartPage }) => {
    await productPage.waitForLoaded();
    await productPage.addToCart(1);

    await header.openCart();
    await expect(cartPage.productTitles).toHaveCount(1);

    await cartPage.removeItem(0);

    await expect(cartPage.productTitles).toHaveCount(0);
  });
});
