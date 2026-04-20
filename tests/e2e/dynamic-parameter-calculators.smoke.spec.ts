import { expect, test } from '@playwright/test'

const tokenKey = 'hycom3.0'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(([key, ttl]) => {
    localStorage.setItem(key, JSON.stringify({
      value: 'lc-test-session:developer',
      expiry: Date.now() + ttl
    }))
  }, [tokenKey, 60 * 60 * 1000])
})

test('section3/3.1.1 demo still works', async ({ page }) => {
  await page.goto('/#/section3/3.1/3.1.1')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  await expect(page.locator('textarea[readonly]')).toHaveValue(/流量系数=0\.77/)
})

test('section3/3.2 demo still works', async ({ page }) => {
  await page.goto('/#/section3/3.2')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/断面压坡线P1=/)
  await expect(result).toHaveValue(/断面压坡线P6=/)
  await expect(result).toHaveValue(/>2m水头/)
})

test('section3/3.3.1 demo still works', async ({ page }) => {
  await page.goto('/#/section3/3.3/3.3.1')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/流量系数μ=0\.8398/)
  await expect(result).toHaveValue(/流量系数μ估=0\.8866/)
})

test('section7/7.2 demo still works', async ({ page }) => {
  await page.goto('/#/section7/7.2')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  await expect(page.locator('textarea[readonly]')).toHaveValue(/流量系数=0\.77/)
})
