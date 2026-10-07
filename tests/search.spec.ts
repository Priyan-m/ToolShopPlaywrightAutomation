import { expect, test } from '../fixtures/pages';
import { search } from '../utils/test-data';

test.describe('Search and sorting', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('TC04 - search returns only matching products', async ({ homePage }) => {
    await homePage.search(search.validTerm);

    await expect(homePage.searchCaption).toContainText(search.validTerm);
    await expect
      .poll(async () => {
        const names = await homePage.getProductNames();
        return names.length > 0 && names.every((n) => n.toLowerCase().includes(search.validTerm.toLowerCase()));
      }, { message: `every result should contain "${search.validTerm}"` })
      .toBe(true);
  });

  test('TC05 - search with no matches shows an empty-state message', async ({ homePage }) => {
    await homePage.search(search.noResultsTerm);

    await expect(homePage.noResultsMessage).toBeVisible();
    await expect(homePage.noResultsMessage).toContainText(/no products found/i);
  });

  test('TC06 - sorting by price low to high orders products ascending', async ({ homePage }) => {
    await homePage.sortBy('price,asc');

    await expect
      .poll(async () => {
        const prices = await homePage.getProductPrices();
        return prices.length > 1 && prices.every((p, i) => i === 0 || prices[i - 1] <= p);
      }, { message: 'prices should be in ascending order' })
      .toBe(true);
  });
});
