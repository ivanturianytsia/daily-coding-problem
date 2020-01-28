'use strict'

const task = 'Implement regular expression'

class AnyState {
  constructor (next) {
    this.next = next
  }

  check (char) {
    return char
  }

  getNext () {
    return [this.next]
  }

  match () {
    return false
  }
}

class CharState extends AnyState {
  constructor (char, next) {
    super(next)

    this.char = char
  }

  check (char) {
    return char === this.char
  }
}

class EndState {
  check (char) {
    return !char
  }

  getNext () {
    return []
  }

  match () {
    return true
  }
}

class RepeatAnyState extends AnyState {
  getNext () {
    return [this.next, this]
  }
}

class RepeatCharState extends CharState {
  getNext () {
    return [this.next, this]
  }
}

function match (regex, str) {
  const startState = getStartState(regex)
  // const startState = new CharState('r', new CharState('a', new AnyState(new EndState())))
  let next = [startState]
  str.split('').forEach(char => {
    const valid = next.filter(state => {
      return state.check(char)
    })

    next = []

    valid.forEach(state => {
      next = next.concat(state.getNext())
    })
  })

  return next.some(state => state.match())
}

function getStartState (regex) {
  let state = new EndState()
  for (let i = regex.length - 1; i >= 0; i--) {
    const char = regex[i]
    if (char === '*') {
      i--
      const char = regex[i]
      if (char === '.') {
        state = new RepeatAnyState(state)
      } else {
        state = new RepeatCharState(char, state)
      }
    } else {
      if (char === '.') {
        state = new AnyState(state)
      } else {
        state = new CharState(char, state)
      }
    }
  }
  return state
}

const tests = [{
  args: ['ra.', 'ray'],
  expected: true
}, {
  args: ['.*at', 'chat'],
  expected: true
}, {
  args: ['.*at', 'chats'],
  expected: false
}, {
  args: ['fo*ba*r', 'fooobaaaaaaar'],
  expected: true
}]

const implementations = [match]

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