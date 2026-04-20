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

test('step spillway calculator demo still works', async ({ page }) => {
  await page.goto('/#/section1/1.6/1.6.1')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/L1=34\.5300; d1=1\.1618; v=6\.5416/)
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

test('hall aeration calculator demo still works', async ({ page }) => {
  await page.goto('/#/section3/3.3/3.3.5/3.3.5.2')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/第2断面:掺气水深=7\.99218/)
})

test('table calculator demo still works', async ({ page }) => {
  await page.goto('/#/section3/3.4')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/第1断面:水流空化数=0\.57812/)
})

test('section5 cavitation calculator demo still works', async ({ page }) => {
  await page.goto('/#/section5/5.6')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/第1断面:水流空化数=0\.86417;第2断面:水流空化数=0\.71879;/)
})

test('report calculator demo still works', async ({ page }) => {
  await page.goto('/#/section1/1.1/1.1.1')

  await page.getByRole('button', { name: '算例' }).click()
  await page.getByRole('button', { name: '计算' }).click()

  const result = page.locator('textarea[readonly]')
  await expect(result).toHaveValue(/PMF下泄量Q=14291\.74/)
  await expect(page.locator('#mav-editor')).toContainText(/PMF工况下泄量/)

  await page.getByRole('button', { name: '编辑' }).click()

  const reportEditor = page.locator('#mav-editor textarea').first()
  const originalReport = await reportEditor.inputValue()
  await expect(reportEditor).toHaveValue(/PMF工况下泄量/)

  await reportEditor.evaluate((element) => {
    const textarea = element as HTMLTextAreaElement
    textarea.focus()
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length
  })
  await reportEditor.type('\n<p>手动追加内容</p>')

  const updatedReport = await reportEditor.inputValue()
  expect(updatedReport.startsWith(originalReport)).toBe(true)
  expect(updatedReport).toContain('手动追加内容')

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: '下载PDF' }).click()
  const download = await downloadPromise

  await expect.poll(async () => download.suggestedFilename()).toContain('计算书')
  await expect.poll(async () => download.suggestedFilename()).toContain('.pdf')
  await expect.poll(async () => await download.failure()).toBeNull()

  await page.getByRole('button', { name: '计算' }).click()
  await expect(reportEditor).toHaveValue(/PMF工况下泄量/)
  await expect(reportEditor).not.toHaveValue(/手动追加内容/)
})
