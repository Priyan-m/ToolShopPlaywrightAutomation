/**
 * Test data for the Toolshop suite.
 * The default customer account is the public demo account published on
 * practicesoftwaretesting.com; override it with environment variables if needed.
 */
export const users = {
  customer: {
    email: process.env.TOOLSHOP_EMAIL ?? 'customer@practicesoftwaretesting.com',
    password: process.env.TOOLSHOP_PASSWORD ?? 'welcome01',
    fullName: 'Jane Doe',
  },
  invalid: {
    email: 'customer@practicesoftwaretesting.com',
    password: 'wrong-password-123',
  },
};

export const search = {
  validTerm: 'Pliers',
  noResultsTerm: 'xyz-no-such-product-123',
};

export const billingAddress = {
  street: 'Test street 98',
  houseNumber: '98',
  city: 'Vienna',
  state: 'Vienna',
  country: 'Austria',
  postalCode: '1010',
};

export const bankTransfer = {
  bankName: 'Test Bank',
  accountName: 'Jane Doe',
  accountNumber: '1234567890',
};

/** Converts a price string such as "$14.15" into a number (14.15). */
export function parsePrice(text: string): number {
  return Number(text.replace(/[^0-9.]/g, ''));
}
