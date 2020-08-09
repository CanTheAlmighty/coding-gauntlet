
import { Terminal } from 'terminal-kit'
import { Problem } from '../00_definition/Problem'

// MARK: - Main

const bruteforce = (tty: Terminal) => {
    [7,1,5,3,6,4]
}

const aaaa = (tty: Terminal) => {

}

// MARK: -  Export

const problem: Problem = {
    title: 'Revenue Maximization',
    description: 'Given an array with stock prices, decide when to buy and sell stocks',
    solutions: { bruteforce, aaaa }
}

export default problem