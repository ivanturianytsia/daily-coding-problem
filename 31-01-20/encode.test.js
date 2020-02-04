'use strict'

const task = 'Run-length encoding'

function encode (str) {
  let result = ''
  let currentChar = null
  let count = 0

  str.split('').forEach(char => {
    if (currentChar !== char) {
      if (currentChar) {
        result = `${result}${count}${currentChar}`
      }
      currentChar = char
      count = 0
    }
    count++
  })

  if (currentChar) {
    result = `${result}${count}${currentChar}`
  }

  return result
}

const tests = [{
  args: ['AAAABBBCCDAA'],
  expected: '4A3B2C1D2A'
}]

const implementations = [encode]

describe(task, () => {
  implementations.forEach(implementation => {
    tests.forEach(({ args, expected }) => {
      test('Implementation', () => {
        const actual = implementation(...args)
        expect(actual).toEqual(expected)
      })
    })
  })
})