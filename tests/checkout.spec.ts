import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CHECKOUT_DATA } from '../utils/checkoutData';

test.describe('Checkout Form Tests', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
  });

  test('Checkout Form Order Success: should complete form and get order confirmation', async ({ page }) => {
    await checkoutPage.fillBillingAddress({
      fullName: CHECKOUT_DATA.BILLING_ADDRESS.FULL_NAME,
      email: CHECKOUT_DATA.BILLING_ADDRESS.EMAIL,
      address: CHECKOUT_DATA.BILLING_ADDRESS.ADDRESS,
      city: CHECKOUT_DATA.BILLING_ADDRESS.CITY,
      state: CHECKOUT_DATA.BILLING_ADDRESS.STATE,
      zip: CHECKOUT_DATA.BILLING_ADDRESS.ZIP
    });

    await checkoutPage.fillPaymentInfo({
      cardName: CHECKOUT_DATA.PAYMENT.CARD_NAME,
      cardNumber: CHECKOUT_DATA.PAYMENT.CARD_NUMBER,
      expMonth: CHECKOUT_DATA.PAYMENT.EXP_MONTH,
      expYear: CHECKOUT_DATA.PAYMENT.EXP_YEAR,
      cvv: CHECKOUT_DATA.PAYMENT.CVV
    });
    
    const isChecked = await checkoutPage.sameAddressCheckbox.isChecked();
    if (!isChecked) {
      await checkoutPage.toggleSameAddressCheckbox();
    }
    
    await checkoutPage.submitForm();
    
    await expect(checkoutPage.orderConfirmation).toBeVisible();
    await expect(checkoutPage.orderNumberElement).toContainText(CHECKOUT_DATA.ORDER_NUMBER_TEXT);
    
    const orderNumber = await checkoutPage.getOrderNumber();
    expect(orderNumber).toBeTruthy();
    expect(orderNumber).not.toBe('');
    console.log(`Order confirmation received with number: ${orderNumber}`);
  });

  test('Checkout Form Alert: should show and handle alert when checkbox is unchecked', async ({ page }) => {
    await checkoutPage.fillBillingAddress({
      fullName: CHECKOUT_DATA.BILLING_ADDRESS.FULL_NAME,
      email: CHECKOUT_DATA.BILLING_ADDRESS.EMAIL,
      address: CHECKOUT_DATA.BILLING_ADDRESS.ADDRESS,
      city: CHECKOUT_DATA.BILLING_ADDRESS.CITY,
      state: CHECKOUT_DATA.BILLING_ADDRESS.STATE,
      zip: CHECKOUT_DATA.BILLING_ADDRESS.ZIP
    });

    await checkoutPage.fillPaymentInfo({
      cardName: CHECKOUT_DATA.PAYMENT.CARD_NAME,
      cardNumber: CHECKOUT_DATA.PAYMENT.CARD_NUMBER,
      expMonth: CHECKOUT_DATA.PAYMENT.EXP_MONTH,
      expYear: CHECKOUT_DATA.PAYMENT.EXP_YEAR,
      cvv: CHECKOUT_DATA.PAYMENT.CVV
    });
    
    const isChecked = await checkoutPage.sameAddressCheckbox.isChecked();
    if (isChecked) {
      await checkoutPage.toggleSameAddressCheckbox();
    }
    
    const dialog = await checkoutPage.submitFormAndWaitForDialog();
    console.log(`Alert message received: "${dialog.message()}"`);
    expect(dialog.message()).toBe(CHECKOUT_DATA.ALERT_MESSAGE);
    await dialog.accept();
    
    await expect(page.locator('dialog, .modal, .popup')).toHaveCount(0);
  });
});
