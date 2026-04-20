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

test('main calculator content stays visible after viewport resize', async ({ page }) => {
  await page.goto('/#/section1/1.2')

  const calculateButton = page.getByRole('button', { name: '计算' })
  await expect(calculateButton).toBeVisible()

  await page.setViewportSize({ width: 860, height: 900 })
  await expect(calculateButton).toBeVisible()

  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(calculateButton).toBeVisible()
})

const simpleCalculatorCases = [
  {
    label: 'section1/1.2',
    path: '/#/section1/1.2',
    result: /h1=16\.153\|h2=11\.167\|h3=9\.438/
  },
  {
    label: 'section1/1.5',
    path: '/#/section1/1.5',
    result: /断面3:水流空化数=0\.21;需要设掺气坎/
  },
  {
    label: 'section1/1.3/1.3.1',
    path: '/#/section1/1.3/1.3.1',
    result: /PMF洪水下挑距=333\.65/
  },
  {
    label: 'section1/1.3/1.3.2',
    path: '/#/section1/1.3/1.3.2',
    result: /冲坑深度=53\.61/
  },
  {
    label: 'section1/1.4/1.4.1',
    path: '/#/section1/1.4/1.4.1',
    result: /水跃长度=172\.46/
  },
  {
    label: 'section1/1.4/1.4.2',
    path: '/#/section1/1.4/1.4.2',
    result: /池深:8\.90\|池长:137\.97/
  },
  {
    label: 'section1/1.1/1.1.2/1.1.2.1',
    path: '/#/section1/1.1/1.1.2/1.1.2.1',
    result: /侧收缩系数 ε :0\.98447/
  },
  {
    label: 'section1/1.1/1.1.2/1.1.2.2',
    path: '/#/section1/1.1/1.1.2/1.1.2.2',
    result: /泄流能力Q:432\.01019/
  },
  {
    label: 'section1/1.1/1.1.3',
    path: '/#/section1/1.1/1.1.3',
    result: /流量Q:458\.63/
  },
  {
    label: 'section1/1.1/1.1.4',
    path: '/#/section1/1.1/1.1.4',
    result: /泄流量Q=4213\.54/
  },
  {
    label: 'section1/1.1/1.1.5',
    path: '/#/section1/1.1/1.1.5',
    result: /泄流量Q=1308\.25/
  },
  {
    label: 'section5/5.1.1',
    path: '/#/section5/5.1/5.1.1',
    result: /泄量=3978\.22/
  },
  {
    label: 'section5/5.1.2',
    path: '/#/section5/5.1/5.1.2',
    result: /流量: 2448\.33\| 出口流速: 37\.10\| 流量系数: 0\.87/
  },
  {
    label: 'section5/5.2',
    path: '/#/section5/5.2',
    result: /掺气水深=17\.3688/
  },
  {
    label: 'section5/5.3.1',
    path: '/#/section5/5.3/5.3.1',
    result: /挑距:333\.65\|冲坑深度:68\.26/
  },
  {
    label: 'section5/5.3.2',
    path: '/#/section5/5.3/5.3.2',
    result: /冲坑深度:25\.57/
  },
  {
    label: 'section5/5.4.1',
    path: '/#/section5/5.4/5.4.1',
    result: /左表孔挑射距=77\.80/
  },
  {
    label: 'section5/5.4.2',
    path: '/#/section5/5.4/5.4.2',
    result: /水垫深度=28\.75/
  },
  {
    label: 'section5/5.4.3',
    path: '/#/section5/5.4/5.4.3',
    result: /冲击流速=17\.4870, 水舌入射角=113\.2671/
  },
  {
    label: 'section5/5.4.4',
    path: '/#/section5/5.4/5.4.4',
    result: /左表孔射流跌落冲击底板动水压力=128\.83/
  },
  {
    label: 'section5/5.4.5',
    path: '/#/section5/5.4/5.4.5',
    result: /自下游水面至坑底最大水垫深度=42\.77/
  },
  {
    label: 'section5/5.5',
    path: '/#/section5/5.5',
    result: /不设辅助消能工:L=165\.00, Fr=4\.58, h1=4\.79, h2=28\.70/
  },
  {
    label: 'section2/2.1',
    path: '/#/section2/2.2/2.1',
    result: /侧槽溢洪道前沿长=64\.36/
  },
  {
    label: 'section2/2.2',
    path: '/#/section2/2.2/2.2',
    result: /h1=5\.4875\|h2=6\.0868\|h3=6\.5021\|h4=6\.7833\|h5=6\.7759\|/
  },
  {
    label: 'section3/3.1.2',
    path: '/#/section3/3.1/3.1.2',
    result: /泄流量=1445\.12/
  },
  {
    label: 'section3/3.3.2',
    path: '/#/section3/3.3/3.3.2',
    result: /泄量=2227\.90\|出口断面流速=27\.70/
  },
  {
    label: 'section3/3.3.3',
    path: '/#/section3/3.3/3.3.3',
    result: /流量:2304\.20\|出口断面流速:29\.07/
  },
  {
    label: 'section3/3.3.4',
    path: '/#/section3/3.3/3.3.4',
    result: /h1:6\.51\|h2:7\.92/
  },
  {
    label: 'section4/4.1',
    path: '/#/section4/4.1',
    result: /泄量=1064\.514/
  },
  {
    label: 'section4/4.2',
    path: '/#/section4/4.2',
    result: /泄量=1055\.800/
  },
  {
    label: 'section6/6.1',
    path: '/#/section6/6.1',
    result: /水深:2\.16\|流速:2\.31/
  },
  {
    label: 'section6/6.2',
    path: '/#/section6/6.2',
    result: /缓流a1型壅水曲线\|h1=8\.950\|h2=8\.781\|h3=8\.615\|h4=8\.451\|h5=8\.287\|h6=8\.127\|h7=7\.968\|/
  },
  {
    label: 'section7/7.1',
    path: '/#/section7/7.1',
    result: /管道直径=11\.59/
  },
  {
    label: 'section7/7.3.1',
    path: '/#/section7/7.3/7.3.1',
    result: /水锤波速=649\.18/
  },
  {
    label: 'section7/7.3.2',
    path: '/#/section7/7.3/7.3.2',
    result: /管道特征系数=2\.4028/
  },
  {
    label: 'section7/7.3.3',
    path: '/#/section7/7.3/7.3.3',
    result: /水锤特征系数=0\.2187/
  },
  {
    label: 'section7/7.3.4',
    path: '/#/section7/7.3/7.3.4',
    result: /间接水锤; tr=1\.001211533801793/
  },
  {
    label: 'section7/7.3.5',
    path: '/#/section7/7.3/7.3.5',
    result: /水锤压力=352\.73/
  },
  {
    label: 'section7/7.3.6',
    path: '/#/section7/7.3/7.3.6',
    result: /正水锤:41\.09\|负水锤:26\.34/
  },
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

for (const testCase of simpleCalculatorCases) {
  test(`${testCase.label} demo still works`, async ({ page }) => {
    await page.goto(testCase.path)

    await page.getByRole('button', { name: '算例' }).click()
    await page.getByRole('button', { name: '计算' }).click()

    const result = page.locator('textarea[readonly]')
    await expect(result).toHaveValue(testCase.result)
  })
}
