'use strict'

function getLargestSum (list) {
  let max = 0

  function addNext (list, sum = 0) {
    if (list.length >= 2) {
      addNext(list.slice(2), list[0] >= 0 ? sum + list[0] : sum)
      addNext(list.slice(3), list[1] >= 0 ? sum + list[1] : sum)
    } else if (list.length === 1) {
      addNext(list.slice(2), list[0] >= 0 ? sum + list[0] : sum)
    } else if (sum >= max) {
      max = sum
    }
  }

  addNext(list)

  return max
}

function getLargestSumConst (list) {
  let excluded = 0
  let included = list[0]

  list.slice(1).forEach(number => {
    let newExcluded = Math.max(excluded, included)
    included = excluded + number
    excluded = newExcluded
  })

  return Math.max(included, excluded)
}

const tests = [
  [[2, 4, 6, 2, 5], 13],
  [[5, 1, 1, 5], 10],
  [[-1, 1, 5, -5], 5],
  [[-1, -1, -5, -5], 0],
  [[-7, 1, 5, 1, 2, 3, 7, 3, 1, 9, 9], 24]
]

module.exports = {
  solutions: [getLargestSum, getLargestSumConst],
  tests
}