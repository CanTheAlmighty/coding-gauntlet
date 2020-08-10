// Common
import { Problem, Solution } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

const profitMatrix = (prices: Array<number>): { matrix: Array<number>, width: number } => {
    const profitMatrixWidth = prices.length
    let profitMatrix = Array<number>(Math.pow(profitMatrixWidth, 2))

    tty.yellow(' ' + prices.map(p => p.toFixed(0).padStart(3, ' ')).join('') + '\n\n')

    for (let buy=0; buy < prices.length; buy++) {
        // Add N spaces on the left (so it looks like half-matrix)
        tty.yellow(prices[buy].toFixed(0) + '   '.repeat(buy))
        tty('  0')

        for (let sell=buy+1; sell < prices.length; sell++) {
            const profit = prices[sell] - prices[buy]
            profitMatrix[buy*profitMatrixWidth + sell] = profit

            const ttyColored = profit > 0 ? tty.green : tty.red
            ttyColored(profit.toFixed(0).padStart(3, ' '))
        }

        tty('\n')
    }

    tty('\n')

    return {
        matrix: profitMatrix,
        width: profitMatrixWidth
    }
}

const dynamicProgramming = (prices: Array<number>): number => {
    const matrix = profitMatrix(prices)
    return 0
}


export { dynamicProgramming }