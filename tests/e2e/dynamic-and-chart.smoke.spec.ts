import { expect, test } from '@playwright/test'

const tokenKey = 'hycom3.0'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(([key, ttl]) => {
    localStorage.setItem(key, JSON.stringify({
      value: 'developer-token',
      expiry: Date.now() + ttl
    }))
  }, [tokenKey, 60 * 60 * 1000])
})

test('chart calculator demo still works', async ({ page }) => {
  await page.goto('/#/section1/1.6/1.6.2')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/eta=0\.9470/)
})

test('dynamic calculator demo still works', async ({ page }) => {
  await page.goto('/#/section3/3.3/3.3.5/3.3.5.3')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/第1断面:掺气水深=13\.80776/)
})

test('table calculator demo still works', async ({ page }) => {
  await page.goto('/#/section3/3.4')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/第1断面:水流空化数=0\.57812/)
})
