import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTotal: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTotal = page.getByText('Total').locator('span.price');
    this.cartItems = page.locator('p:has(a[href="#"])');
  }

  async goto() {
    await this.page.goto('/checkout');
  }

  async getCartTotal() {
    const totalText = await this.cartTotal.textContent();
    return totalText ? parseFloat(totalText.replace(/[^0-9.]/g, '')) : 0;
  }

  async getCartItemsPrices() {
    const items = await this.cartItems.all();
    const prices: number[] = [];
    
    for (const item of items) {
      const priceElement = item.locator('span.price');
      const priceText = await priceElement.textContent();
      if (priceText) {
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        prices.push(price);
      }
    }
    
    return prices;
  }

  async calculateExpectedTotal() {
    const prices = await this.getCartItemsPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }
}
