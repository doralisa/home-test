import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  
  readonly cardNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expMonthSelect: Locator;
  readonly expYearInput: Locator;
  readonly cvvInput: Locator;
  
  readonly sameAddressCheckbox: Locator;
  readonly submitButton: Locator;
  readonly orderConfirmation: Locator;
  readonly orderNumberElement: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.fullNameInput = page.locator('#fname');
    this.emailInput = page.locator('#email');
    this.addressInput = page.locator('#adr');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.zipInput = page.locator('#zip');
    
    this.cardNameInput = page.locator('#cname');
    this.cardNumberInput = page.locator('#ccnum');
    this.expMonthSelect = page.locator('#expmonth');
    this.expYearInput = page.locator('#expyear');
    this.cvvInput = page.locator('#cvv');
    
    this.sameAddressCheckbox = page.locator('input[name="sameadr"]');
    this.submitButton = page.locator('button.btn:has-text("Continue to checkout")');
    this.orderConfirmation = page.locator('#order-confirmation');
    this.orderNumberElement = page.locator('[data-id="ordernumber"]');
  }

  async goto() {
    await this.page.goto('/checkout');
  }

  async fillBillingAddress(data: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  }) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipInput.fill(data.zip);
  }

  async fillPaymentInfo(data: {
    cardName: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvv: string;
  }) {
    await this.cardNameInput.fill(data.cardName);
    await this.cardNumberInput.fill(data.cardNumber);
    await this.expMonthSelect.selectOption(data.expMonth);
    await this.expYearInput.fill(data.expYear);
    await this.cvvInput.fill(data.cvv);
  }



  async submitForm() {
    await this.submitButton.click();
  }

  async toggleSameAddressCheckbox() {
    await this.sameAddressCheckbox.click();
  }

  async getOrderNumber() {
    const orderNumberText = await this.orderNumberElement.textContent();
    const match = orderNumberText!.match(/\d+/);
    return match ? match[0] : null;
  }

  async submitFormAndWaitForDialog() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.submitForm();
    return await dialogPromise;
  }


}
