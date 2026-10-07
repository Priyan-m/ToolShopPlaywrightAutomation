import { expect, Locator, Page } from '@playwright/test';
import { parsePrice } from '../utils/test-data';

/** Step 1 of checkout: the shopping cart table. */
export class CartPage {
  readonly productTitles: Locator;
  readonly quantityInputs: Locator;
  readonly linePrices: Locator;
  readonly cartTotal: Locator;
  readonly proceedButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(private readonly page: Page) {
    this.productTitles = page.getByTestId('product-title');
    this.quantityInputs = page.getByTestId('product-quantity');
    this.linePrices = page.getByTestId('line-price');
    this.cartTotal = page.getByTestId('cart-total');
    this.proceedButton = page.getByTestId('proceed-1');
    this.emptyCartMessage = page.getByText(/The cart is empty/i);
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  /** Changes the quantity of a cart row and blurs the field so the cart recalculates. */
  async setQuantity(rowIndex: number, quantity: number): Promise<void> {
    const input = this.quantityInputs.nth(rowIndex);
    await input.fill(String(quantity));
    await input.press('Tab');
  }

  async getLinePrice(rowIndex: number): Promise<number> {
    return parsePrice((await this.linePrices.nth(rowIndex).textContent()) ?? '0');
  }

  async removeItem(rowIndex: number): Promise<void> {
    await this.page.locator('tbody tr').nth(rowIndex).locator('.btn-danger').click();
  }

  async proceed(): Promise<void> {
    await expect(this.proceedButton).toBeEnabled();
    await this.proceedButton.click();
  }
}
