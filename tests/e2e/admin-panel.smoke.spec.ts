import { expect, Page, test } from '@playwright/test'

const tokenKey = 'hycom3.0'

async function seedSession(page: Page, token: string) {
  await page.addInitScript(([key, ttl, value]) => {
    localStorage.setItem(key, JSON.stringify({
      value,
      expiry: Date.now() + ttl
    }))
  }, [tokenKey, 60 * 60 * 1000, token])
}

test('developer cannot access admin panel', async ({ page }) => {
  await seedSession(page, 'lc-test-session:developer')
  await page.goto('/#/admin_panel')

  await expect(page).toHaveURL(/#\/dashboard$/)
})

test('admin can access admin panel data', async ({ page }) => {
  await seedSession(page, 'lc-test-session:admin')
  await page.goto('/#/admin_panel')

  await expect(page.getByText('用户列表')).toBeVisible()
  await expect(page.getByText('意见反馈列表')).toBeVisible()
  await expect(page.getByText('test-admin')).toBeVisible()
  await expect(page.getByText('test@example.com')).toBeVisible()
})
