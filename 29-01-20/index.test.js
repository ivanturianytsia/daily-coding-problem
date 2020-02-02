'use strict'

const task = 'Validate brackets'

function validate (str) {
  let valid = true
  const stack = []
  const pairs = [
    ['(', ')'],
    ['[', ']'],
    ['{', '}']
  ]

  str.split('').forEach(element => {
    pairs.forEach(([left, right]) => {
      if (element === left) {
        stack.push(element)
      } else if (element === right && stack.pop() !== left) {
        valid = false
      }
    })
  })

  return valid && (stack.length === 0)
}

const tests = [{
  args: ['([])[]({})'],
  expected: true
}, {
  args: ['([)]'],
  expected: false
}, {
  args: ['((()'],
  expected: false
}]

const implementations = [validate]

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