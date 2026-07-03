import { test, expect } from '@playwright/test'

test('クイズ1周フロー: 入力→判定→次の問題', async ({ page }) => {
  await page.goto('/')
  await page.getByText('練習を始める').click()

  // 問題が表示される
  await expect(page.getByText(/×/)).toBeVisible()

  // テキスト入力して送信
  const input = page.getByLabel('答えの入力欄')
  await input.fill('999')
  await expect(input).toHaveValue('999')
  await page.getByRole('button', { name: '✓' }).click()

  // 正解か不正解かのフィードバックが出る
  await expect(page.getByRole('status')).toBeVisible()

  // 次の問題へ
  await page.getByText('次の問題へ').click()
  await expect(page.getByLabel('答えの入力欄')).toHaveValue('')
})

test('テンキーUIで入力できる', async ({ page }) => {
  await page.goto('/')
  await page.getByText('練習を始める').click()

  // 数字ボタンをタップして入力
  await page.getByRole('button', { name: '1' }).first().click()
  await page.getByRole('button', { name: '2' }).first().click()
  await expect(page.getByLabel('答えの入力欄')).toHaveValue('12')

  // クリアボタンで消える
  await page.getByRole('button', { name: 'C' }).click()
  await expect(page.getByLabel('答えの入力欄')).toHaveValue('')
})
