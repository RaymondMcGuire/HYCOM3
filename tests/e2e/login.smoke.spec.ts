import { expect, test } from '@playwright/test'

test('login page renders', async ({ page }) => {
  await page.goto('/#/login')

  await expect(page.getByRole('button', { name: '登录' })).toBeVisible()
  await expect(page.getByRole('button', { name: '注册新账号' })).toBeVisible()
})

test('register page renders and validates required inputs', async ({ page }) => {
  await page.goto('/#/register')

  await expect(page.getByRole('button', { name: '注册' })).toBeVisible()
  await page.getByRole('button', { name: '注册' }).click()

  await expect(page.getByText('用户名不能小于5位')).toBeVisible()
  await expect(page.getByText('密码不能小于5位')).toBeVisible()
})
