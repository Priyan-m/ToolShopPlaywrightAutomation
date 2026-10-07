import { expect, Locator, Page } from '@playwright/test';
import { parsePrice } from '../utils/test-data';

/** The product overview page: search, sorting and the product grid. */
export class HomePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchCaption: Locator;
  readonly noResultsMessage: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.searchCaption = page.getByTestId('search-caption');
    this.noResultsMessage = page.getByTestId('no-results');
    this.sortDropdown = page.getByTestId('sort');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.productNames.first()).toBeVisible();
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async sortBy(value: 'price,asc' | 'price,desc' | 'name,asc' | 'name,desc'): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async getProductNames(): Promise<string[]> {
    return (await this.productNames.allTextContents()).map((n) => n.trim());
  }

  async getProductPrices(): Promise<number[]> {
    return (await this.productPrices.allTextContents()).map(parsePrice);
  }

  async openProduct(name: string): Promise<void> {
    await this.productNames.filter({ hasText: name }).first().click();
  }

  async openFirstProduct(): Promise<void> {
    await this.productNames.first().click();
  }
}
