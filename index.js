import './polyfill'
import './weak-map'
import './iterator-async'
import './iterator'

// ---

const a = async function* () {}

const b = a()
b.take()
