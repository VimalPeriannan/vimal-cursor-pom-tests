import { test, expect } from '@playwright/test';

test('Verify dashboard navigation elements after welcome message', async ({ page }) => {
    // Navigate to the dashboard (assuming you're already logged in)
    await page.goto('your-app-url/dashboard');

    // First verify the welcome message (previous test step)
    await expect(page.locator('.welcome-message')).toBeVisible();

    // Next, verify the presence of main navigation elements
    // This is the next logical step after confirming welcome message
    
    // Verify the main navigation menu container exists
    await expect(page.locator('nav.main-navigation')).toBeVisible();

    // Verify all expected navigation items are present
    const expectedNavItems = [
        'Home',
        'Projects',
        'Tasks',
        'Reports',
        'Settings'
    ];

    // Loop through each expected nav item and verify its presence
    for (const item of expectedNavItems) {
        await expect(page.locator('nav.main-navigation').getByText(item)).toBeVisible();
    }

    // Verify that navigation items are clickable
    // Test clicking the first nav item (Home)
    await page.locator('nav.main-navigation').getByText('Home').click();
    
    // Verify URL changed to home section
    await expect(page).toHaveURL(/.*\/home/);

    // Optional: Verify the active state of clicked nav item
    await expect(page.locator('nav.main-navigation .active')).toContainText('Home');
}); 