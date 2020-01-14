'use strict'

function countPossibleWays (steps, possibleSteps) {
  let count = 0

  function run (stepsLeft) {
    if (stepsLeft === 0) {
      count++
    } else if (stepsLeft > 0) {
      possibleSteps.forEach(step => {
        run(stepsLeft - step)
      })
    }
  }

  run(steps)

  return count
}

const tests = [{
  args: [4, [1, 2]],
  expected: 5
}, {
  args: [6, [1, 3, 5]],
  expected: 8
}]

// 111111
// 3111
// 1113
// 1311
// 1131
// 51
// 15
// 33

const implementations = [countPossibleWays]

describe('Staircase', () => {
  test('Implementation', () => {
    implementations.forEach(implementation => {
      tests.forEach(({ args, expected }) => {
        const actual = implementation(...args)
        expect(actual).toEqual(expected)
      })
    })
  })
})