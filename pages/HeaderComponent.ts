import { Locator, Page } from '@playwright/test';

/** The top navigation bar shared by every page (user menu, cart icon). */
export class HeaderComponent {
  readonly userMenu: Locator;
  readonly signOutLink: Locator;
  readonly signInLink: Locator;
  readonly cartLink: Locator;
  readonly cartQuantity: Locator;

  constructor(private readonly page: Page) {
    this.userMenu = page.getByTestId('nav-menu');
    this.signOutLink = page.getByTestId('nav-sign-out');
    this.signInLink = page.getByTestId('nav-sign-in');
    this.cartLink = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
  }

  async signOut(): Promise<void> {
    await this.userMenu.click();
    await this.signOutLink.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
