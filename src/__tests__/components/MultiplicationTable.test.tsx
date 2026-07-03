// src/__tests__/components/MultiplicationTable.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MultiplicationTable } from '../../components/table/MultiplicationTable'

describe('MultiplicationTable', () => {
  it('11×11〜19×19 のグリッドが表示される', () => {
    render(<MultiplicationTable />)
    // 11×11=121 〜 19×19=361 の代表値
    expect(screen.getByText('121')).toBeInTheDocument()
    expect(screen.getByText('361')).toBeInTheDocument()
  })

  it('セルをタップすると式とインド式解説が表示される', () => {
    render(<MultiplicationTable />)
    // 156 は 12×13 と 13×12 の2箇所に現れるため、最初のセル(12×13)を取得
    const cell156 = screen.getAllByText('156')[0]
    fireEvent.click(cell156)
    expect(screen.getByText('12 × 13 = 156')).toBeInTheDocument()
    expect(screen.getByText('インド式（縦・交差法）')).toBeInTheDocument()
  })
})
