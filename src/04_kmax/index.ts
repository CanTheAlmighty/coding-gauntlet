
// Common
import { Problem, Solution } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

const solution = (p: { unsorted: Array<number>, k: number }): number => {
    const sorted = p.unsorted.sort()
    const length = p.unsorted.length

    return sorted[length - p.k]
}

const problem: Problem<{ unsorted: Array<number>, k: number }, number> = {
    title: 'K-Max',
    description: 'Find the K maximum number',
    solutions: {
        dumb: solution
    },
    tests: [
        { argument: { unsorted: [3,2,1,5,6,4], k: 2 }, expected: 5 },
        { argument: { unsorted: [3,2,3,1,2,4,5,5,6], k: 4 }, expected: 4 }
    ]
}

export default problem