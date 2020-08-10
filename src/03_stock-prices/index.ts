
import { Problem, Solution } from '../00_definition/Problem'

import { recursive } from './recursive'
import { combinatorial } from './combinatorial'
import { dynamicProgramming } from './dynamicProgramming'

// MARK: -  Export

const problem: Problem = {
    title: 'Revenue Maximization',
    description: 'Given an array with stock prices, decide when to buy and sell stocks',
    solutions: { recursive } //, dynamicProgramming, combinatorial }
}

export default problem