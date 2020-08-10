// Common
import { Problem, Solution } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

// Sub-Solutions
import { recursive } from './recursive'
import { combinatorial } from './combinatorial'
import { dynamicProgramming } from './dynamicProgramming'

// MARK: -  Export

const problem: Problem<Array<number>, number> = {
    title: 'Revenue Maximization',
    description: 'Given an array with stock prices, decide when to buy and sell stocks',
    solutions: { combinatorial },
    tests: [
        { argument: [7, 1, 5, 3, 6, 4], expected: 7 },
        { argument: [1, 2, 3, 4, 5], expected: 4 },
        { argument: [7, 6, 4, 3, 1], expected: 0 },
    ]
}

export default problem