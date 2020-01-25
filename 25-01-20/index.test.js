'use strict'

function getShortestPath (board, [startY, startX], [endY, endX]) {
  const pathsBoard = (new Array(board.length)).fill(null).map(() => {
    return (new Array(board[0].length)).fill(null)
  })

  const allowedMoves = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  let shortestPath = null
  let currentStep = 0

  pathsBoard[startY][startX] = currentStep

  while (true) {
    pathsBoard.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== null && y === endY && x === endX) {
          shortestPath = value
        }
      })
    })

    if (shortestPath !== null) {
      break
    }

    let hasMoved = false
    pathsBoard.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === currentStep) {
          allowedMoves.forEach(([moveY, moveX]) => {
            const [nextY, nextX] = [y + moveY, x + moveX]
            const isValidMove = nextY >= 0 && nextX >= 0 && nextY < pathsBoard.length && nextX < pathsBoard[0].length
            if (isValidMove) {
              const notVisited = pathsBoard[nextY][nextX] === null
              const noWall = !board[nextY][nextX]
              if (notVisited && noWall) {
                hasMoved = true
                pathsBoard[nextY][nextX] = currentStep + 1
              }
            }
          })
        }
      })
    })

    if (!hasMoved) {
      break
    }

    currentStep++
  }

  console.log(pathsBoard)

  return shortestPath
}

const board1 = [
  [false, false, false, false],
  [true, true, false, true],
  [false, false, false, false],
  [false, false, false, false]
]

const board2 = [
  [false, false, false, false],
  [true, true, true, true],
  [false, false, false, false],
  [false, false, false, false]
]

const board3 = [
  [false, false, false, false],
  [true, true, true, true],
  [false, false, false, false],
  [false, false, false, false]
]

const tests = [{
  args: [board1, [3, 0], [0, 0]],
  expected: 7
}, {
  args: [board2, [3, 0], [0, 0]],
  expected: null
}, {
  args: [board2, [3, 0], [3, 0]],
  expected: 0
}]

const implementations = [getShortestPath]

describe('Get longest substring length', () => {
  implementations.forEach(implementation => {
    tests.forEach(({ args, expected }) => {
      test('Implementation', () => {
        const actual = implementation(...args)
        expect(actual).toEqual(expected)
      })
    })
  })
})