'use strict'

function getLongestSubstring (s, k) {
  const occurence = {}

  s.split('').forEach(char => {
    if (!occurence[char]) {
      occurence[char] = 0
    }

    occurence[char]++
  })

  const values = Object.values(occurence)

  values.sort()

  return values.slice(-1 * k).reduce((sum, value) => value + sum, 0)
}

const tests = [{
  args: ['eaabbbccdddd', 3],
  expected: 9
}]

const implementations = [getLongestSubstring]

describe('Get longest substring length', () => {
  test('Implementation', () => {
    implementations.forEach(implementation => {
      tests.forEach(({ args, expected }) => {
        const actual = implementation(...args)
        expect(actual).toEqual(expected)
      })
    })
  })
})