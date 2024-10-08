// @ts-check
const { test, expect } = require('@playwright/test');
test.describe('New Todo', () => {
    
    test.beforeEach(async ({ page }) => {
                // check page title
                await page.goto('');
                await expect(page).toHaveTitle('React • TodoMVC');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('active and completed filters', async ({ page }) => {
        // create a todo
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('water the plants');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await expect(page.getByText('water the plants')).toBeVisible();

        // create another todo
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('feed the dog');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await expect(page.getByText('feed the dog')).toBeVisible();

        // mark the first todo as completed
        await page.locator('li').filter({ hasText: 'water the plants' }).getByLabel('Toggle Todo').check();
        await expect(page.locator('li').filter({ hasText: 'water the plants' }).getByLabel('Toggle Todo')).toBeChecked();
        // check uncompleted todo
        await page.getByRole('link', { name: 'active' }).click();
        await expect(page.getByText('feed the dog')).toBeVisible();

        // check completed todo
        await page.getByRole('link', { name: 'completed' }).click();
        await expect(page.getByText('water the plants')).toBeVisible();
    });

    test('text field is cleared when item is added', async ({ page }) => {
        const todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
        // create a todo
        await todoInput.fill('water the plants');
        await todoInput.press('Enter');
        await expect(todoInput).toBeEmpty();
        await expect(page.getByText('water the plants')).toBeVisible();
    });
});