// https://github.com/tc39/proposal-iterator-helpers/issues/296

const Iterator = Object.getPrototypeOf((function* () {})()[Symbol.iterator]())
const IteratorPrototype = Object.getPrototypeOf(Iterator)

IteratorPrototype.take = function* (count) {
  for (let i = 0; i < count; i++) {
    const r = this.next()
    if (r.value !== undefined) {
      yield r.value
    }
    if (r.done) {
      break
    }
  }
}
