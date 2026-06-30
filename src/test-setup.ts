import '@testing-library/jest-dom/vitest'

// Node 25 + Vitest 4 環境では globalThis.localStorage（undici 由来）が
// 不完全になり jsdom の window.localStorage を上書きしてしまうため、
// テスト用に動作する localStorage 実装を差し替える。
const store = new Map<string, string>()

const localStoragePolyfill: Storage = {
  get length() {
    return store.size
  },
  clear() {
    store.clear()
  },
  getItem(key: string) {
    return store.has(key) ? (store.get(key) as string) : null
  },
  key(index: number) {
    return Array.from(store.keys())[index] ?? null
  },
  removeItem(key: string) {
    store.delete(key)
  },
  setItem(key: string, value: string) {
    store.set(key, String(value))
  },
}

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: localStoragePolyfill,
})
