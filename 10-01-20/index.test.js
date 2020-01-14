'use strict'

class Node {
  constructor (value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

function countUnival (rootNode) {
  let count = 0

  function isUnival (node) {
    if (!node) {
      return true
    }
    if (!isUnival(node.left) || !isUnival(node.right)) {
      return false
    }
    if (node.left && node.value !== node.left.value) {
      return false
    }
    if (node.right && node.value !== node.right.value) {
      return false
    }
    count++
    return true
  }

  isUnival(rootNode)

  return count
}

const tree1 = new Node(0,
  new Node(1),
  new Node(0,
    new Node(1,
      new Node(1),
      new Node(1)),
    new Node(0)))

const tests = [{
  args: [tree1],
  expected: 5
}]

const implementations = [countUnival]

describe('Count unival trees', () => {
  test('Implementation', () => {
    implementations.forEach(implementation => {
      tests.forEach(({ args, expected }) => {
        const actual = implementation(...args)
        expect(actual).toEqual(expected)
      })
    })
  })
})