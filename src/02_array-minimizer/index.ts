// Common
import { Problem, Solution } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

const minimizeArray = (array: Array<number>): number => {
    let headWrite = 0
    let lastValue = array[0]
    
    for (let headRead=0; headRead < array.length; headRead++) {
        const value = array[headRead]

        if (lastValue < array[headRead]) {
            // We found a increment, save it on the leftmost part.
            array[++headWrite] = value
            lastValue = value
        }
    }

    return headWrite
}

const main: Solution<Array<number>, number> = (example) => {

    tty(`Input: ${ example }\n`)

    const lengthShortest = minimizeArray(example)

    // Slice the remaining values
    example.splice(lengthShortest, example.length - lengthShortest)

    tty(`Minimized Output (length: ${ lengthShortest }): ${ example }\n`)
    return lengthShortest
}

// MARK: - Export

const problem: Problem<Array<number>, number> = {
    title: 'Array Minimizer',
    description: 'Remove all duplicates from an number-ascendant array',
    solutions: { main },
    tests: [
        { argument: [0,0,1,1,1,2,2,3,3,4], expected: 4 }
    ]
}

export default problem