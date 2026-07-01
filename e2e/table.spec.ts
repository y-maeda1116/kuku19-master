import { test, expect } from '@playwright/test'

test('九九表セルタップで解説表示', async ({ page }) => {
  await page.goto('/')
  await page.getByText('九九表を見る').click()

  // 156（12×13）のセルをタップ（対称セルの 13×12=156 と重複するため最初を指定）
  await page.getByText('156', { exact: true }).first().click()

  // 式とインド式解説が表示される
  await expect(page.getByText('12 × 13 = 156')).toBeVisible()
  await expect(page.getByText('インド式（縦・交差法）')).toBeVisible()
})
