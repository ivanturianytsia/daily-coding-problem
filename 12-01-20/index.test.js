'use strict'

function autocompleteDumb (query, possible) {
  return possible.filter(term => term.startsWith(query))
}

class Node {
  constructor () {
    this.children = {}
    this.completeWords = []
  }

  getSubtreeWords () {
    let words = []
    if (this.completeWords.length) {
      words = words.concat(this.completeWords)
    }
    Object.keys(this.children).forEach(char => {
      words = words.concat(this.children[char].getSubtreeWords())
    })
    return words
  }

  nextChild (char) {
    if (!this.children[char]) {
      this.children[char] = new Node()
    }

    return this.children[char]
  }
}

function autocompleteTree (query, possible) {
  const root = preprocessPossible(possible)

  let subtreeRoot = root
  query.split('').forEach(char => {
    if (subtreeRoot) {
      subtreeRoot = subtreeRoot.children[char]
    }
  })

  return subtreeRoot ? subtreeRoot.getSubtreeWords() : []
}

function preprocessPossible (possible) {
  const root = new Node()

  possible.forEach(term => {
    let currentNode = root

    term.split('').forEach((char, index) => {
      currentNode = currentNode.nextChild(char)
    })

    currentNode.completeWords.push(term)
  })

  return root
}

const tests = [{
  args: ['de', ['dog', 'deer', 'deal']],
  expected: ['deer', 'deal']
}]

const implementations = [autocompleteDumb, autocompleteTree]

describe('Autocomplete', () => {
  test('startsWith autocomplete', () => {
    implementations.forEach(implementation => {
      tests.forEach(({ args, expected }) => {
        const actual = implementation(...args)
        expect(actual).toEqual(expected)
      })
    })
  })
})