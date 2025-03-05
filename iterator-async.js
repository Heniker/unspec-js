// https://github.com/tc39/proposal-async-iterator-helpers

const AsyncIterator = Object.getPrototypeOf(
  (async function*() {})()[Symbol.asyncIterator]()
)

AsyncIterator.from = function(iterable) {
  return {
    [Symbol.asyncIterator]: async function*() {
      for await (const value of iterable) {
        yield value
      }
    }
  }
}

AsyncIterator.prototype.map = async function*(callback) {
  let index = 0
  for await (const value of this) {
    yield callback(value, index++)
  }
}

AsyncIterator.prototype.filter = async function*(callback) {
  let index = 0
  for await (const value of this) {
    if (callback(value, index++)) {
      yield value
    }
  }
}

AsyncIterator.prototype.take = async function*(count) {
  for (let i = 0; i < count; i++) {
    const r = await this.next()
    if (r.value !== undefined) {
      yield r.value
    }
    if (r.done) {
      break
    }
  }
}

AsyncIterator.prototype.drop = async function*(count) {
  let index = 0
  for await (const value of this) {
    if (index++ >= count) {
      yield value
    }
  }
}

AsyncIterator.prototype.flatMap = async function*(callback) {
  let index = 0
  for await (const value of this) {
    const mapped = callback(value, index++)
    if (mapped[Symbol.asyncIterator] || mapped[Symbol.iterator]) {
      for await (const innerValue of mapped) {
        yield innerValue
      }
    } else {
      yield mapped
    }
  }
}

AsyncIterator.prototype.reduce = async function(reducer, initialValue) {
  let accumulator = initialValue
  let first = true

  for await (const value of this) {
    if (accumulator === undefined && first) {
      accumulator = value // Use first value if no initialValue. Similar to [].reduce
      first = false
    } else {
      accumulator = reducer(accumulator, value)
    }
  }

  if (accumulator === undefined) {
    throw new TypeError(
      "Cannot reduce an empty async iterator without an initial value."
    )
  }

  return accumulator
}

AsyncIterator.prototype.toArray = async function() {
  const result = []
  for await (const value of this) {
    result.push(value)
  }
  return result
}

AsyncIterator.prototype.some = async function(callback) {
  let index = 0
  for await (const value of this) {
    if (await callback(value, index++)) {
      return true
    }
  }
  return false
}

AsyncIterator.prototype.every = async function(callback) {
  let index = 0
  for await (const value of this) {
    if (!(await callback(value, index++))) {
      return false
    }
  }
  return true
}

AsyncIterator.prototype.find = async function(callback) {
  let index = 0
  for await (const value of this) {
    if (await callback(value, index++)) {
      return value
    }
  }
  return undefined
}
