'use strict'

const task = 'Run-length decoding'

function decode (str) {
  let result = ''
  let count = null

  str.split('').forEach(char => {
    const newCount = parseInt(char)
    if (!isNaN(newCount)) {
      count = newCount
    } else {
      result = `${result}${char.repeat(count)}`
    }
  })

  return result
}

const tests = [{
  args: ['4A3B2C1D2A'],
  expected: 'AAAABBBCCDAA'
}]

const implementations = [decode]

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