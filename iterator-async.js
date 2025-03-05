// https://github.com/tc39/proposal-async-iterator-helpers

const AsyncIterator = Object.getPrototypeOf((async function* () {})()[Symbol.asyncIterator]())
const AsyncIteratorPrototype = Object.getPrototypeOf(AsyncIterator)

// AsyncIterator.from = function (iterable) {
//   return {
//     [Symbol.asyncIterator]: async function* () {
//       for await (const value of iterable) {
//         yield value
//       }
//     },
//   }
// }

AsyncIteratorPrototype.map = async function* (callback) {
  let index = 0
  for await (const value of this) {
    yield callback(value, index++)
  }
}

AsyncIteratorPrototype.filter = async function* (callback) {
  let index = 0
  for await (const value of this) {
    if (callback(value, index++)) {
      yield value
    }
  }
}

AsyncIteratorPrototype.take = async function* (count) {
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

AsyncIteratorPrototype.drop = async function* (count) {
  let index = 0
  for await (const value of this) {
    if (index++ >= count) {
      yield value
    }
  }
}

AsyncIteratorPrototype.flatMap = async function* (callback) {
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

AsyncIteratorPrototype.reduce = async function (reducer, initialValue) {
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
    throw new TypeError('Cannot reduce an empty async iterator without an initial value.')
  }

  return accumulator
}

AsyncIteratorPrototype.toArray = async function () {
  const result = []
  for await (const value of this) {
    result.push(value)
  }
  return result
}

AsyncIteratorPrototype.some = async function (callback) {
  let index = 0
  for await (const value of this) {
    if (await callback(value, index++)) {
      return true
    }
  }
  return false
}

AsyncIteratorPrototype.every = async function (callback) {
  let index = 0
  for await (const value of this) {
    if (!(await callback(value, index++))) {
      return false
    }
  }
  return true
}

AsyncIteratorPrototype.find = async function (callback) {
  let index = 0
  for await (const value of this) {
    if (await callback(value, index++)) {
      return value
    }
  }
  return undefined
}
