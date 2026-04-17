import { expect, test } from '@playwright/test'

test('login page renders', async ({ page }) => {
  await page.goto('/#/login')

  await expect(page.getByRole('button', { name: '登录' })).toBeVisible()
  await expect(page.getByRole('button', { name: '注册新账号' })).toBeVisible()
})
