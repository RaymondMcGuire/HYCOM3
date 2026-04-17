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

const section8Cases = [
  {
    label: 'section8/8.1',
    path: '/#/section8/8.1',
    result: /管道沿程水头损失=402\.38/
  },
  {
    label: 'section8/8.2',
    path: '/#/section8/8.2',
    result: /管道沿程水头损失=352\.83/
  },
  {
    label: 'section8/8.3',
    path: '/#/section8/8.3',
    result: /管道沿程水头损失=345\.73/
  },
  {
    label: 'section8/8.4',
    path: '/#/section8/8.4',
    result: /管道沿程水头损失=365\.75/
  },
  {
    label: 'section8/8.5',
    path: '/#/section8/8.5',
    result: /管道沿程水头损失=23\.45/
  }
]

for (const testCase of section8Cases) {
  test(`${testCase.label} demo still works`, async ({ page }) => {
    await page.goto(testCase.path)

    await page.getByRole('button', { name: '算例' }).click()
    await page.getByRole('button', { name: '计算' }).click()

    const result = page.locator('textarea[readonly]')
    await expect(result).toHaveValue(testCase.result)
  })
}
