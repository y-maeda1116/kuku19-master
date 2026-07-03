// src/domain/indianMethod.ts
export type IndianMethodResult = {
  readonly a: number
  readonly b: number
  readonly a1: number
  readonly a0: number
  readonly b1: number
  readonly b0: number
  readonly onesProduct: number
  readonly ones: number
  readonly carry1: number
  readonly tensSum: number
  readonly tens: number
  readonly carry2: number
  readonly hundredsSum: number
  readonly hundreds: number
  readonly carry3: number
  readonly result: number
  readonly steps: ReadonlyArray<string>
}

export const explainIndianMethod = (a: number, b: number): IndianMethodResult => {
  const a1 = Math.floor(a / 10)
  const a0 = a % 10
  const b1 = Math.floor(b / 10)
  const b0 = b % 10

  const onesProduct = a0 * b0
  const ones = onesProduct % 10
  const carry1 = Math.floor(onesProduct / 10)

  const tensSum = a1 * b0 + a0 * b1 + carry1
  const tens = tensSum % 10
  const carry2 = Math.floor(tensSum / 10)

  const hundredsSum = a1 * b1 + carry2
  const hundreds = hundredsSum % 10
  const carry3 = Math.floor(hundredsSum / 10)

  const result = carry3 * 1000 + hundreds * 100 + tens * 10 + ones

  const steps: ReadonlyArray<string> = [
    `① 一の位: ${a0}×${b0}=${onesProduct}${carry1 > 0 ? `（繰り上がり ${carry1}）` : ''}`,
    `② 十の位: ${a1}×${b0}+${a0}×${b1}${carry1 > 0 ? `+${carry1}` : ''}=${tensSum}${carry2 > 0 ? `（繰り上がり ${carry2}）` : ''}`,
    `③ 百の位: ${a1}×${b1}${carry2 > 0 ? `+${carry2}` : ''}=${hundredsSum}${carry3 > 0 ? `（繰り上がり ${carry3}）` : ''}`,
    `→ ${result}`,
  ]

  return {
    a, b, a1, a0, b1, b0,
    onesProduct, ones, carry1,
    tensSum, tens, carry2,
    hundredsSum, hundreds, carry3,
    result, steps,
  }
}
