'use strict'

function pow (base, exponent) {
  const result = Array.from({length: exponent}).reduce(result => result * base, 1)
  return result
}

function fastPow (base, exponent) {
  if (exponent === 1) {
    return base
  }
  const newExponent = Math.floor(exponent / 2)
  let result = fastPow(base, newExponent)
  result *= result
  if (exponent % 2 === 1) {
    result *= base
  }
  return result
}

const tests = [{
  args: [3, 2],
  expected: 9
}, {
  args: [3, 10],
  expected: 59049
}, {
  args: [2, 10],
  expected: 1024
}, {
  args: [2, 50],
  expected: 1125899906842624
}]

const implementations = { pow, fastPow }

Object.entries(implementations).forEach(([name, implementation]) => {
  describe(`Implementation: ${name}`, () => {
    tests.forEach(({ args, expected }, index) => {
      test(`Test ${index + 1}`, () => {
        Array.from({ length: 1000 }).forEach(() => {
          const actual = implementation(...args)
          expect(actual).toEqual(expected)
        })
      })
    })
  })
})
