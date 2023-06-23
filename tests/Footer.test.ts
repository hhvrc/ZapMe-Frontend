import { expect, test } from '@playwright/test';

// text: Take Control of Your Submissives from Anywhere in the World.
test('index page contains text', async ({ page }) => {
  await page.goto('/');
  const text = await page.textContent(
    'text=Take Control of Your Submissives from Anywhere in the World.'
  );
  expect(text).toBe('Take Control of Your Submissives from Anywhere in the World.');
});
