import { expect, Locator, Page, test } from '@playwright/test'

const tokenKey = 'hycom3.0'

type SchemaSelectCase = {
  name: string
  path: string
  selectIndex: number
  optionIndex: number
}

const schemaSelectCases: SchemaSelectCase[] = [
  { name: '1.1.2.2 进口底坎边缘', path: '/#/section1/1.1/1.1.2/1.1.2.2', selectIndex: 0, optionIndex: 1 },
  { name: '1.1.3 驼峰堰堰型', path: '/#/section1/1.1/1.1.3', selectIndex: 0, optionIndex: 1 },
  { name: '1.2 实用堰类型', path: '/#/section1/1.2', selectIndex: 0, optionIndex: 1 },
  { name: '1.3.2 可冲类别', path: '/#/section1/1.3/1.3.2', selectIndex: 0, optionIndex: 2 },
  { name: '5.3.1 可冲类别', path: '/#/section5/5.3/5.3.1', selectIndex: 0, optionIndex: 2 },
  { name: '5.3.2 可冲类别', path: '/#/section5/5.3/5.3.2', selectIndex: 0, optionIndex: 2 },
  { name: '6.1 断面形状', path: '/#/section6/6.1', selectIndex: 0, optionIndex: 1 },
  { name: '6.2 实用堰类型', path: '/#/section6/6.2', selectIndex: 0, optionIndex: 1 },
  { name: '6.2 断面形状', path: '/#/section6/6.2', selectIndex: 1, optionIndex: 1 }
]

test.beforeEach(async ({ page }) => {
  await page.addInitScript(([key, ttl]) => {
    localStorage.setItem(key, JSON.stringify({
      value: 'lc-test-session:developer',
      expiry: Date.now() + ttl
    }))
  }, [tokenKey, 60 * 60 * 1000])
})

async function getSelectMetrics(select: Locator) {
  return select.evaluate((element: Element) => {
    const selectRoot = element as HTMLElement
    const selection = selectRoot.querySelector('.el-select__selection') as HTMLElement | null
    const placeholder = selectRoot.querySelector('.el-select__placeholder') as HTMLElement | null

    return {
      selectWidth: Math.round(selectRoot.getBoundingClientRect().width),
      selectionWidth: selection ? Math.round(selection.getBoundingClientRect().width) : 0,
      placeholderWidth: placeholder ? Math.round(placeholder.getBoundingClientRect().width) : 0
    }
  })
}

async function assertSchemaSelectVisible(page: Page, testCase: SchemaSelectCase) {
  await page.goto(testCase.path)

  const select = page.locator('.param-control.el-select').nth(testCase.selectIndex)
  await expect(select).toBeVisible()

  await select.click()
  const option = page.locator('.el-select-dropdown__item:visible').nth(testCase.optionIndex)
  await expect(option).toBeVisible()
  const expectedLabel = (await option.innerText()).trim()
  await option.click({ force: true })

  const label = select.locator('.el-select__selected-item:not(.el-select__input-wrapper), .el-select__placeholder').first()
  await expect(label).toHaveText(expectedLabel)
  await expect(label).toBeVisible()

  const metrics = await getSelectMetrics(select)
  expect(metrics.selectWidth).toBeGreaterThan(100)
  expect(metrics.selectionWidth).toBeGreaterThan(0)
  expect(metrics.placeholderWidth).toBeGreaterThan(0)
}

for (const testCase of schemaSelectCases) {
  test(`selected select value stays visible on schema form ${testCase.name}`, async ({ page }) => {
    await assertSchemaSelectVisible(page, testCase)
  })
}

test('selected select value stays visible on dynamic calculator forms', async ({ page }) => {
  await page.goto('/#/section3/3.1/3.1.1')
  await page.getByRole('button', { name: '算例' }).click()

  const label = page.locator('.dynamic-field-grid__inputs .el-select__placeholder span').first()

  await expect(label).toBeVisible()

  const styles = await label.evaluate((element) => {
    const computed = window.getComputedStyle(element)
    const parent = window.getComputedStyle(element.parentElement as Element)
    return {
      text: element.textContent,
      fontSize: computed.fontSize,
      opacity: computed.opacity,
      visibility: computed.visibility,
      parentDisplay: parent.display
    }
  })

  expect(styles.text?.trim().length).toBeGreaterThan(0)
  expect(styles.fontSize).not.toBe('0px')
  expect(styles.opacity).not.toBe('0')
  expect(styles.visibility).toBe('visible')
  expect(styles.parentDisplay).not.toBe('none')
})
