import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: 'src',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['html', { open: 'never' }]] : [['html', { open: 'on-failure' }]],
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		}
	]
};

export default config;