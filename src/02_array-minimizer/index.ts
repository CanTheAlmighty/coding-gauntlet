import { Problem } from '00_definition/Problem'
import { Terminal } from 'terminal-kit'

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

const main = (tty: Terminal) => {
    let example = [0,0,1,1,1,2,2,3,3,4]

    tty(`Input: ${ example }\n`)

    const lengthShortest = minimizeArray(example)

    // Slice the remaining values
    example.splice(lengthShortest, example.length - lengthShortest)

    tty(`Minimized Output (length: ${ lengthShortest }): ${ example }\n`)
}

// MARK: - Export

const problem: Problem = {
    title: 'Array Minimizer',
    description: 'Remove all duplicates from an number-ascendant array',
    solutions: { main }
}

export default problem