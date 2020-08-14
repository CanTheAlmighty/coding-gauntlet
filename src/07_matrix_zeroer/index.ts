// Common
import { Problem, Solution } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

// Matrix: rows[cols]
type Matrix = Array<Array<number>>

/** Zeroes' out a column */
const zeroCol = (matrix: Matrix, col: number) => {
    const height = matrix.length
    
    for (let row=0; row < height; row++) {
        matrix[row][col] = 0
    }
}

/** Zeroes' out a row, but if there's a zero already, it swaps it for FLAG */
const zeroRow = (matrix: Matrix, row: number, flag: number) => {
    const width = matrix[row].length
    
    for (let col=0; col < width; col++) {
        if (matrix[row][col] === 0) {
            matrix[row][col] = flag
        }
        else {
            matrix[row][col] = 0
        }
    }
}

const matrixIterator = (matrix: Matrix) => {
    const height = matrix.length
    const width  = matrix[0].length

    const self = {
        forEach: (operation: (row: number, col: number) => void | 'break') => {
            for (let row=0; row < height; row++) {
                for (let col=0; col < width; col++) {
                    if (operation(row, col) === 'break') { break }
                }
            }

            return self      
        },
        print: (flag: number, title: string = '') => {
            tty(`Matrix: ${ title }\n`)
            for (let row=0; row < height; row++) {
                tty('  ')

                for (let col=0; col < width; col++) {
                    const value = matrix[row][col]

                    if (value === 0) {
                        tty.grey(value.toFixed(0).padStart(2, ' '))
                    }
                    else if (value === flag) {
                        tty.red('X'.padStart(2, ' '))
                    }
                    else {
                        tty.yellow(value.toFixed(0).padStart(2, ' '))
                    }
                }

                tty('\n')
            }

            return self
        }
    }

    return self
}

const matrixZeroer = (matrix: Matrix): Matrix => {
    // Find the maximum+1 number in the matrix, we'll use this number
    // as the "flag" number
    const flag = matrix.reduce((prevcol, currentcol) => Math.max(prevcol, 
        currentcol.reduce((prevrow, currentrow) => Math.max(prevrow, currentrow), 0)
    ), 0) + 1

    matrixIterator(matrix).print(flag, 'Received')

    // Zero-out rows, and replace already existing zeroes with FLAG.
    matrixIterator(matrix)
    .forEach((row, col) => {
        if (matrix[row][col] === 0) {
            // Zero-out this entire row, and leave
            zeroRow(matrix, row, flag)
            return 'break'
        }
    })
    .print(flag, 'Zeroed-Rows')

    // Zero-out columns where the was a FLAG.
    matrixIterator(matrix)
    .forEach((row, col) => {
        if (matrix[row][col] === flag) {
            zeroCol(matrix, col)
        }
    })
    .print(flag, 'Zeroed-Cols')

    return matrix
}

const problem: Problem<Matrix, Matrix> = {
    title: 'Matrix Zeroer',
    description: 'For every zero found, replace the entire row and column with zeroes in-place',
    solutions: {
        optimumSpace: matrixZeroer
    },
    tests: [
        {
            argument: [[1,1,1], [1,0,1], [1,1,1]],
            expected: [[1,0,1], [0,0,0], [1,0,1]]
        },
        {
            argument: [[0,1,2,0], [3,4,5,2], [1,3,1,5]],
            expected: [[0,0,0,0], [0,4,5,0], [0,3,1,0]]
        },
    ]
}

export default problem