import test from 'ava'
import { compose } from '@earthtone/tiny-compose'
import { of, map, option } from '../maybe'

const isValid =
  x => typeof x === 'number' && !isNaN(x)

const stringify =
  x => String(x)

const add10 =
  num => num + 10

const square =
  num => Math.pow(num, 2)

const doMath =
  compose(square, add10)

const maybeValid =
  of(isValid)

const safeMath =
  compose(map(doMath), maybeValid)

const safeStringMath =
  compose(map(stringify), safeMath)

const safeString =
  compose(option('None'), safeStringMath)

test('return Nothing for values that do not fulfill predicate', assert => {
  assert.deepEqual(maybeValid('kitty kat'), [])
  assert.deepEqual(maybeValid(null), [])
  assert.deepEqual(maybeValid(undefined), [])
})

test('returns Just for values that do fulfill predicate', assert => {
  assert.deepEqual(maybeValid(0), [0])
  assert.deepEqual(maybeValid(1), [1])
  assert.deepEqual(maybeValid(10), [10])
})

test('map can be composed with maybes', assert => {
  assert.deepEqual(safeMath(0), [100])
  assert.deepEqual(safeMath(1), [121])
  assert.deepEqual(safeMath(10), [400])

  assert.deepEqual(safeMath(NaN), [])
  assert.deepEqual(safeMath('kitty kat'), [])
  assert.deepEqual(safeMath({}), [])
})

test('map can be composed with maybes for days', assert => {
  assert.deepEqual(safeStringMath(NaN), [])
  assert.deepEqual(safeStringMath('kitty kat'), [])
  assert.deepEqual(safeStringMath({}), [])
  assert.deepEqual(safeStringMath(0), ['100'])
  assert.deepEqual(safeStringMath(1), ['121'])
  assert.deepEqual(safeStringMath(10), ['400'])
})

test('option unwraps a maybe value or returns a given default instead of a Nothing', assert => {
  assert.is(safeString(0), '100')
  assert.is(safeString(1), '121')
  assert.is(safeString(10), '400')

  assert.is(safeString('kitty kat'), 'None')
  assert.is(safeString({}), 'None')
  assert.is(safeString(undefined), 'None')
})

test('can all be composed together', assert => {
  const has = prop => obj => obj.hasOwnProperty(prop) // eslint-disable-line
  const get = prop => obj => obj[prop]
  const validData = {
    name: 'Sam'
  }

  const invalidData = {
    year: 1979
  }

  const safeName = compose(
    option('No name'),
    map(get('name')),
    of(has('name'))
  )

  assert.is(safeName(validData), 'Sam')
  assert.is(safeName(invalidData), 'No name')
})
