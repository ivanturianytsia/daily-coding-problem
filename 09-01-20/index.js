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

const tests = [
  ['10', 1],
  ['11', 2],
  ['101', 1],
  ['111', 3],
  ['1111', 5],
  ['101101', 1],
  ['622', 2],
  ['627', 1]
]

tests.forEach(([code, expected]) => {
  const result = getNumberOfWaysToDecode(code)
  console.assert(result === expected, `${code} should get ${expected}, got ${result}`)
})
