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

const tests = [
  [tree1, 5]
]

tests.forEach(([tree, expected]) => {
  const result = countUnival(tree)
  console.assert(result === expected, `Should return ${expected}, got ${result}`)
})