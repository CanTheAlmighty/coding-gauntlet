import { tty } from '../00_common/Terminal'
import { Problem } from '../00_common/Excercise'

// MARK: - Drawing

const bitmap = {
    pixel: '██',
    empty: '  ',
}

const drawHeightmap = (heights: Array<number>): void => {
    const bitmapHeight = heights.reduce((p, v) => Math.max(p, v), 0)
    const bitmapWidth  = heights.length
    
    tty('Heightmap: \n\n')
    
    // Draw from top to bottom ('cause terminals)
    for (let y=bitmapHeight; y >= 0; y--) {
        tty('  ' + y.toFixed(0).padStart(2, '0') + ' — ')
        
        for (let x=0; x < bitmapWidth; x++) {
            if (y <= heights[x]) {
                tty.white(bitmap.pixel)
            }
            else {
                tty(bitmap.empty)
            }
            
        }
        
        tty('\n')
    }
}

// MARK: - Solver

const waterCalculator = (heights: Array<number>): number => {
    drawHeightmap(heights)

    const heightMaximum = heights.reduce((p, v) => Math.max(p, v), 0)

    // Water pool map, counts how many potential water blocks are there
    //  -1: Water cannot exist here
    //   0: We found a supporting structure that can store water
    // 1-N: We are accumulating water, until we hit another wall
    let waterPools = Array<number>(heightMaximum).fill(-1)
    let waterTotal = 0

    for (const height of heights) {
        // Iterate from floor to ceiling (irrelevant of the height of the current pillar)
        for (let iter=0; iter < heightMaximum; iter++) {
            if (iter < height) {
                // We are in a "wall segment"
                if (waterPools[iter] <= 0) {
                    // If the water pool is -1, means we just found the "left" wall of the pool
                    // Start collecting water
                    waterPools[iter] = 0
                }
                else {
                    // If the water pool is >0, it means that we found the "right wall" of this pool
                    // Extract the water, as there's no way there's more in this horizontal axis
                    waterTotal += waterPools[iter]

                    // Reset the wall to nothing
                    waterPools[iter] = 0

                }
            }
            else {
                // We are in an "open air segment"
                if (waterPools[iter] >= 0) {
                    // This pool of water has a left-most wall, thus it can collect water
                    waterPools[iter] += 1
                }
                
                // All "-1" water pools can't collect water, as they never seen a wall first,
                // so they are basically "open air" segments
            }
        }
    }

    return waterTotal
}

const problem: Problem<Array<number>, number> = {
    title: 'Water Pooling',
    description: 'Given a height map, calculate the total amount of water can get pooled in the open air segments',
    solutions: {
        iterative: waterCalculator
    },
    tests: [
        { argument: [0,1,0,2,1,0,1,3,2,1,2,1], expected: 6 }
    ]
}

export default problem