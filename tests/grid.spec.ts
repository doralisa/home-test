import { test, expect } from '@playwright/test';
import { GridPage } from '../pages/GridPage';
import { GRID_DATA } from '../utils/gridData';

test.describe('Grid Tests', () => {
  let gridPage: GridPage;

  test.beforeEach(async ({ page }) => {
    gridPage = new GridPage(page);
    await gridPage.goto();
  });

  test('Grid Item Test: should verify product in position 7 is Super Pepperoni with price $10', async ({ page }) => {
    const itemElement = await gridPage.getGridItemByPosition(7);
    await itemElement.scrollIntoViewIfNeeded();
    
    const productTitle = await gridPage.getProductTitle(7);
    const productPrice = await gridPage.getProductPrice(7);
    
    console.log(`Product in position 7: ${productTitle} - $${productPrice}`);
    
    expect(productTitle).toBe(GRID_DATA.POSITION_7.PRODUCT_NAME);
    expect(productPrice).toBe(GRID_DATA.POSITION_7.PRICE);
  });

  test('Grid All Items Test: should verify all items have non empty title, price, image and button', async ({ page }) => {
    const items = await gridPage.gridItems.all();
    
    console.log(`Total grid items found: ${items.length}`);
    
    for (let i = 0; i < items.length; i++) {
      const position = i + 1;
      const title = await gridPage.getProductTitle(position);
      const price = await gridPage.getProductPrice(position);
      const hasImage = await gridPage.hasImage(position);
      const hasButton = await gridPage.hasButton(position);
      
      console.log(`Item ${position}: Title="${title}", Price=$${price}, HasImage=${hasImage}, HasButton=${hasButton}`);
      
      expect(title).toBeTruthy();
      expect(title!.trim()).not.toBe('');
      expect(price).toBeGreaterThan(0);
      expect(hasImage).toBe(true);
      expect(hasButton).toBe(true);
    }
  });
});
