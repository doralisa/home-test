import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { SEARCH_DATA } from '../utils/searchData';

test.describe('Search Tests', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  test('Search Success: should find results for search term', async ({ page }) => {
    await searchPage.search(SEARCH_DATA.SEARCH_TERM);
    
    await expect(searchPage.searchResults).not.toContainText(SEARCH_DATA.LOADING_MESSAGE);
    await expect(searchPage.searchResults).toContainText(SEARCH_DATA.SUCCESS_MESSAGE_PREFIX);
    
    const resultsText = await searchPage.getSearchResultsText();
    console.log(`Search results: "${resultsText}"`);
    
    expect(resultsText).toContain(SEARCH_DATA.SEARCH_TERM);
  });

  test('Search Empty: should show error message for empty search', async ({ page }) => {
    await searchPage.searchEmpty();
    
    await expect(searchPage.errorMessage).not.toContainText(SEARCH_DATA.LOADING_MESSAGE);
    await expect(searchPage.errorMessage).toContainText(SEARCH_DATA.EMPTY_SEARCH_MESSAGE);
    
    const errorText = await searchPage.getErrorMessageText();
    console.log(`Error message: "${errorText}"`);
  });
});
