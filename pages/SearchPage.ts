import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search..');
    this.searchButton = page.locator('button[type="submit"]');
    this.searchResults = page.locator('#result');
    this.errorMessage = page.locator('#result');
  }

  async goto() {
    await this.page.goto('/search');
  }

  async search(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async searchEmpty() {
    await this.searchButton.click();
  }

  async getSearchResultsText() {
    return await this.searchResults.textContent();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }
}
