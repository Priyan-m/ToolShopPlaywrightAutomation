# Toolshop E2E Automation — Playwright + TypeScript

End-to-end UI test suite for the [Practice Software Testing "Toolshop"](https://practicesoftwaretesting.com) demo e-commerce store, built with **Playwright** and **TypeScript** using the **Page Object Model**. The suite runs on Chromium, Firefox and WebKit, locally and in **GitHub Actions**, and captures HTML reports, screenshots, videos and traces when a test fails.

![Playwright Tests](https://github.com/Priyan-m/toolshop-playwright-e2e/actions/workflows/playwright.yml/badge.svg)

## What is covered

| ID | Area | Scenario | Type |
| --- | --- | --- | --- |
| TC01 | Login | Customer logs in with valid credentials and lands on "My account" | Positive |
| TC02 | Login | Invalid password shows an error and stays on the login page | Negative |
| TC03 | Login | Logged-in customer signs out | Positive |
| TC04 | Search | Searching "Pliers" returns only matching products | Positive |
| TC05 | Search | Search with no matches shows the empty-state message | Negative |
| TC06 | Sorting | Sort by price (low → high) orders products ascending | Positive |
| TC07 | Cart | Adding a product with quantity 2 updates the cart badge | Positive |
| TC08 | Cart | Changing quantity to 3 updates line total to 3 × unit price | Calculation |
| TC09 | Cart | Removing the only item empties the cart | Positive |
| TC10 | Checkout | Logged-in customer completes checkout with bank transfer | End-to-end |

## Project structure

```
toolshop-playwright-e2e/
├── .github/workflows/playwright.yml   # CI: runs each browser in parallel, uploads reports
├── fixtures/pages.ts                  # Custom fixtures that inject page objects into tests
├── pages/                             # Page Object Model
│   ├── HeaderComponent.ts             #   shared nav bar (user menu, cart badge)
│   ├── LoginPage.ts
│   ├── AccountPage.ts
│   ├── HomePage.ts                    #   search, sorting, product grid
│   ├── ProductPage.ts
│   ├── CartPage.ts                    #   checkout step 1
│   └── CheckoutPage.ts                #   checkout steps 2–4
├── tests/                             # Specs grouped by feature
│   ├── login.spec.ts
│   ├── search.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── utils/test-data.ts                 # Test data and helpers
└── playwright.config.ts
```

## Design decisions

- **Page Object Model** keeps locators and page actions out of the tests, so a UI change is fixed in one place.
- **Custom fixtures** (`fixtures/pages.ts`) give each test the page objects it asks for, with no setup boilerplate.
- **Stable locators:** the app exposes `data-test` attributes, so the config sets `testIdAttribute: 'data-test'` and tests use `getByTestId()` instead of brittle CSS or XPath.
- **No hard waits:** tests rely on Playwright's auto-waiting and web-first assertions (`toHaveText`, `expect.poll`) instead of `waitForTimeout`.
- **Debuggable failures:** traces, screenshots and videos are kept only for failed tests.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npx playwright install          # downloads the browsers
npx playwright test             # all 10 tests on all 3 browsers
npm run test:chromium           # Chromium only
npm run test:headed             # watch the browser
npm run test:ui                 # Playwright UI mode
npm run report                  # open the last HTML report
```

To open a failure trace: `npx playwright show-trace test-results/<test-folder>/trace.zip`

## Test data

The tests use the public demo customer account published on the Toolshop site. You can override it:

```bash
TOOLSHOP_EMAIL=you@example.com TOOLSHOP_PASSWORD=secret npx playwright test
```

## Author

**Priyan M** — QA Engineer · [LinkedIn](https://linkedin.com/in/priyanm-2a6246269) · [GitHub](https://github.com/Priyan-m)
