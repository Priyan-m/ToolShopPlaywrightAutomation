import { expect, Locator, Page } from '@playwright/test';
import { parsePrice } from '../utils/test-data';

export class ProductPage {
  readonly productName: Locator;
  readonly unitPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addedToast: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');
    this.quantityInput = page.getByTestId('quantity');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addedToast = page.getByText(/Product added to shopping cart/i);
  }

  async waitForLoaded(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  async getName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? '';
  }

  async getUnitPrice(): Promise<number> {
    return parsePrice((await this.unitPrice.textContent()) ?? '0');
  }

  async addToCart(quantity = 1): Promise<void> {
    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
    await expect(this.addedToast).toBeVisible();
  }
}
