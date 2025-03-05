declare global {
  interface WeakMap<K extends WeakKey, V> {
    clear(): this
  }

  // ---
}

export {}
