import { Page, Locator } from '@playwright/test';

export class GridPage {
  readonly page: Page;
  readonly gridItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gridItems = page.locator('.item');
  }

  async goto() {
    await this.page.goto('/grid');
  }

  async getGridItemByPosition(position: number) {
    return this.gridItems.nth(position - 1);
  }

  async getProductTitle(position: number) {
    const item = await this.getGridItemByPosition(position);
    const titleElement = item.locator('[data-test-id="item-name"]');
    return await titleElement.textContent();
  }

  async getProductPrice(position: number) {
    const item = await this.getGridItemByPosition(position);
    const priceElement = item.locator('#item-price');
    const priceText = await priceElement.textContent();
    return priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : 0;
  }

  async hasImage(position: number): Promise<boolean> {
    const item = await this.getGridItemByPosition(position);
    return await item.locator('img').count() > 0;
  }

  async hasButton(position: number): Promise<boolean> {
    const item = await this.getGridItemByPosition(position);
    return await item.locator('button').count() > 0;
  }
}
