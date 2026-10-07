import { expect, Locator, Page } from '@playwright/test';

type Address = {
  street: string;
  houseNumber: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

type BankDetails = { bankName: string; accountName: string; accountNumber: string };

/** Steps 2–4 of checkout: sign-in confirmation, billing address and payment. */
export class CheckoutPage {
  readonly signedInProceedButton: Locator;
  readonly addressProceedButton: Locator;
  readonly paymentMethod: Locator;
  readonly finishButton: Locator;
  readonly paymentSuccessMessage: Locator;

  constructor(private readonly page: Page) {
    this.signedInProceedButton = page.getByTestId('proceed-2');
    this.addressProceedButton = page.getByTestId('proceed-3');
    this.paymentMethod = page.getByTestId('payment-method');
    this.finishButton = page.getByTestId('finish');
    this.paymentSuccessMessage = page.getByText(/Payment was successful/i);
  }

  async confirmSignedIn(): Promise<void> {
    await this.signedInProceedButton.click();
  }

  /**
   * Fills the billing address. The demo customer's address is usually
   * pre-filled, so a field is only filled when it is empty. Fields are looked
   * up by data-test id; postal code is checked under both ids used by
   * different versions of the app.
   */
  async fillBillingAddress(address: Address): Promise<void> {
    const fields: Array<[string, string]> = [
      ['street', address.street],
      ['house_number', address.houseNumber],
      ['city', address.city],
      ['state', address.state],
      ['country', address.country],
      ['postal_code', address.postalCode],
      ['postcode', address.postalCode],
    ];

    for (const [testId, value] of fields) {
      const field = this.page.getByTestId(testId);
      if ((await field.count()) === 0) continue;

      const tag = await field.evaluate((el) => el.tagName.toLowerCase());
      if (tag === 'select') {
        await field.selectOption({ label: value });
      } else if ((await field.inputValue()).trim() === '') {
        await field.fill(value);
      }
    }
  }

  async proceedFromAddress(): Promise<void> {
    await expect(this.addressProceedButton).toBeEnabled();
    await this.addressProceedButton.click();
  }

  async payByBankTransfer(details: BankDetails): Promise<void> {
    await this.paymentMethod.selectOption('bank-transfer');
    await this.page.getByTestId('bank_name').fill(details.bankName);
    await this.page.getByTestId('account_name').fill(details.accountName);
    await this.page.getByTestId('account_number').fill(details.accountNumber);
    await this.finishButton.click();
  }
}
