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

test('active sidebar section title keeps the themed accent color', async ({ page }) => {
  await page.goto('/#/section4/4.1')

  const sectionTitle = page
    .locator('.sidebar-menu .el-sub-menu__title span')
    .filter({ hasText: '竖井式泄洪洞水力学计算' })
    .first()

  await expect(sectionTitle).toBeVisible()

  const color = await sectionTitle.evaluate((element) => window.getComputedStyle(element).color)

  expect(color).toBe('rgb(139, 202, 243)')
  expect(color).not.toBe('rgb(244, 244, 245)')
})

test('overflowing sidebar keeps dark background after scrolling to the bottom', async ({ page }) => {
  await page.goto('/#/section1/1.1/1.1.1')

  const wrap = page.locator('.sidebar-container .scrollbar-wrapper')
  const metrics = await wrap.evaluate((element) => ({
    scrollHeight: element.scrollHeight,
    clientHeight: element.clientHeight
  }))

  expect(metrics.scrollHeight).toBeGreaterThan(metrics.clientHeight)

  const backgrounds = await page.locator('.sidebar-container').evaluate((container) => {
    const wrapElement = container.querySelector('.scrollbar-wrapper') as HTMLElement | null
    const viewElement = container.querySelector('.el-scrollbar__view') as HTMLElement | null
    const menuElement = container.querySelector('.sidebar-menu') as HTMLElement | null

    if (wrapElement) {
      wrapElement.scrollTop = wrapElement.scrollHeight
    }

    return {
      container: window.getComputedStyle(container).backgroundColor,
      wrap: wrapElement ? window.getComputedStyle(wrapElement).backgroundColor : '',
      view: viewElement ? window.getComputedStyle(viewElement).backgroundColor : '',
      menu: menuElement ? window.getComputedStyle(menuElement).backgroundColor : ''
    }
  })

  expect(backgrounds.container).toBe('rgb(48, 65, 86)')
  expect(backgrounds.wrap).toBe('rgb(48, 65, 86)')
  expect(backgrounds.view).toBe('rgb(48, 65, 86)')
  expect(backgrounds.menu).toBe('rgb(48, 65, 86)')
})
