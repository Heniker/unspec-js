// --- Promise.withResolvers ---
class ManagedPromise extends Promise {
  static [Symbol.species] = Promise

  constructor() {
    let localResolve = _ => {}
    let localReject = () => {}

    super((resolve, reject) => {
      localResolve = resolve
      localReject = reject
    })

    this.resolve = localResolve
    this.reject = localReject
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
// @ts-ignore
Promise.withResolvers ??= Promise.withResolvers = () => {
  const a = new ManagedPromise()
  return { resolve: a.resolve.bind(a), reject: a.reject.bind(a), promise: a }
}

/// --- Array.at ---

Array.prototype.at ??= function(index) {
  if (index < 0) {
    index += this.length
  }
  return this[index]
}
