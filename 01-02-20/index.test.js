'use strict'

const task = 'Elevation map'

function computeWaterTrapped (map) {
  const left = []
  const right = []
  let sum = 0

  left[0] = map[0]
  for (let i = 1; i < map.length; i++) {
    left[i] = Math.max(map[i], left[i - 1])
  }

  right[map.length - 1] = map[map.length - 1]
  for (let i = map.length - 2; i >= 0; i--) {
    right[i] = Math.max(map[i], right[i + 1])
  }

  for (let i = 0; i < map.length; i++) {
    sum += Math.min(left[i], right[i]) - map[i]
  }

  return sum
}

const tests = [{
  args: [[2, 1, 2]],
  expected: 1
}, {
  args: [[3 ,0, 1, 3, 0, 5]],
  expected: 8
}, {
  args: [[3 ,0, 1, 5, 0, 5]],
  expected: 10
}, {
  args: [[5, 0, 4, 1, 0, 3]],
  expected: 9
}, {
  args: [[4, 0, 5, 1, 0, 3]],
  expected: 9
}]

const implementations = [computeWaterTrapped]

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