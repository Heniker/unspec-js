class ClearableWeakMap {
  #wm
  constructor(init) {
    this.#wm = new WeakMap(init)
  }
  clear() {
    this.#wm = new WeakMap()
    return this
  }
  delete(k) {
    return this.#wm.delete(k)
  }
  get(k) {
    return this.#wm.get(k)
  }
  has(k) {
    return this.#wm.has(k)
  }
  set(k, v) {
    this.#wm.set(k, v)
    return this
  }

  [Symbol.toStringTag] = "[object WeakMap]"
}

globalThis.WeakMap = ClearableWeakMap
