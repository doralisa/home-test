import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Tests', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goto();
  });

  test('Cart Total Test: should verify cart total is correct for item prices', async ({ page }) => {
    const actualTotal = await cartPage.getCartTotal();
    const prices = await cartPage.getCartItemsPrices();
    const expectedTotal = await cartPage.calculateExpectedTotal();
    
    console.log(`Individual prices: ${prices.map(p => `$${p}`).join(', ')}`);
    console.log(`Cart total displayed: $${actualTotal}`);
    console.log(`Expected total calculated: $${expectedTotal}`);
    
    expect(actualTotal).toBe(expectedTotal);
  });
});
