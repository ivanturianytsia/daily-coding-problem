function getNumberOfWaysToDecode (code) {
  let totalCount = 0
  const iterate = code => {
    if (code.length >= 2) {
      const twoDigit = parseInt(code.slice(-2))

      if (twoDigit >= 10 && twoDigit <= 26) {
        iterate(code.slice(0, -2))
      }
    }
    if (code.length >= 1) {
      const oneDigit = parseInt(code.slice(-1))

      if (oneDigit >= 1 && oneDigit <= 9) {
        iterate(code.slice(0, -1))
      }
    }
    if (code.length === 0) {
      totalCount++
    }
  }

  iterate(code)

  return totalCount
}

const tests = [{
  args: ['10'],
  expected: 1
},{
  args: ['11'],
  expected: 2
},{
  args: ['101'],
  expected: 1
},{
  args: ['111'],
  expected: 3
},{
  args: ['1111'],
  expected: 5
},{
  args: ['101101'],
  expected: 1
},{
  args: ['622'],
  expected: 2
},{
  args: ['627'],
  expected: 1
}]

const implementations = [getNumberOfWaysToDecode]

describe('Count number of ways to decode', () => {
  test('Implementation', () => {
    implementations.forEach(implementation => {
      tests.forEach(({ args, expected }) => {
        const actual = implementation(...args)
        expect(actual).toEqual(expected)
      })
    })
  })
})