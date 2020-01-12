'use-strict'

const path = require('path')

const directory = process.argv[2]

const { tests, solutions } = require(path.join(__dirname, directory))

solutions.forEach(solution => {
  tests.forEach(([parameters, expected]) => {
    const result = solution(parameters)
    console.assert(result === expected, `${parameters} should return ${expected}, got ${result}`)
  })
})

