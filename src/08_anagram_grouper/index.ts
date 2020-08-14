import { Problem } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

const generateChecksumTable = (maxLength: number, alphabet = 'abcdefghijklmnopqrtstuvwxyz'): { [key: string]: number } => {
    let table: { [key: string]: number } = {}

    let index = 0

    for (const grapheme of alphabet) {
        table[grapheme] = Math.pow(index, maxLength)
        index += 1
    }

    return table
}

const solution = (words: Array<string>): Array<Array<string>> => {
    // Find the longest string
    const maxLength = words.reduce((prevMax, current) => Math.max(prevMax, current.length), 0)

    // Create a checksum table, considering the longest string (to avoid collisions)
    const checksumTable = generateChecksumTable(maxLength)

    // Group results by their unique checksum
    const checksumResults: { [checksum: string]: Array<string> } = {}

    for (const word of words) {
        let checksum: number = 0

        // Create a checksum from each letter
        for (const letter of word) {
            checksum += checksumTable[letter]
        }

        if (!!checksumResults[checksum]) {
            checksumResults[checksum.toFixed(0)].push(word)
        }
        else {
            checksumResults[checksum.toFixed(0)] = [ word ]
        }
    }

    let output: Array<Array<string>> = []

    // Generate the specific output
    for (const checksum of Object.keys(checksumResults)) {
        // Print it
        tty.yellow(checksum.padStart(7, ' ')).white(' weight: [', checksumResults[checksum].join(', '), ']\n')

        output.push(checksumResults[checksum])
    }

    return output
}

const problem: Problem<Array<string>, Array<Array<string>>> = {
    title: 'Anagram grouper',
    description: 'Group together anagrams',
    solutions: {
        main: solution
    },
    tests: [
        { argument: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], expected: [['ate','eat','tea'], ['nat','tan'], ['bat']] }
    ]
}

export default problem