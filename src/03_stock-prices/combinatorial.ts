// Libraries
import { Terminal } from 'terminal-kit'
import { concat } from 'lodash'

// Common
import { Solution } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

/** A singular trade that generates profit */
interface Trade {
    indexBuy: number
    indexSell: number
    profit: number
}

/** A combination of trades that they all generate an aggregated profit */
interface TradeGroup extends Trade {
    profit: number
    trades: Array<Trade>
}

const logTrade = (trade: Trade, tty: Terminal) => {
    tty('  Trade (').yellow(trade.profit.toFixed(0))('): Buy on day ', trade.indexBuy, ' and sell on day ', trade.indexSell, '\n')
}

const logTradeGroup = (group: TradeGroup, tty: Terminal) => {
    tty('Trade Group with profit ').yellow(group.profit.toFixed(0) + '\n')
    group.trades.forEach(t => logTrade(t, tty))
}

const combinatorial: Solution<Array<number>, number> = (stocks: Array<number>) => {
    const length = stocks.length

    tty('For ', stocks, '\n')

    let trades: Array<TradeGroup> = []

    // Create a list of all profit-generating trades
    for (let buy=0; buy < length; buy++) {
        for (let sell=buy+1; sell < length; sell++) {
            const profit = stocks[sell] - stocks[buy]

            const trade: Trade = { profit, indexBuy: buy, indexSell: sell, }

            if (profit > 0) {
                trades.push({ ...trade, trades: [trade] })
            }
        }
    }

    let bestCombinationIndex  = 0
    let bestCombinationProfit = 0
    let iteration = 0

    let modified: boolean

    do {
        modified = false

        tty('All trades, iteration # ').blue(iteration.toFixed(0))('\n')
        trades.forEach(trade => logTradeGroup(trade, tty))

        for (let indexModify = 0; indexModify < trades.length; indexModify++) {
            for (let indexRead = indexModify; indexRead < trades.length; indexRead++) {

                // Skip the invalid combination, that we're selling after buying the next thing
                if (trades[indexModify].indexSell >= trades[indexRead].indexBuy) continue;

                // Fuse the two trade lists
                // (lodash: copies instead of by reference (like default concat))
                trades[indexModify].trades = concat(trades[indexModify].trades, trades[indexRead].trades)

                // Displace the indexSell to the new last sold index
                trades[indexModify].indexSell = trades[indexRead].indexSell

                // Finally, add the new profit
                trades[indexModify].profit += trades[indexRead].profit

                // Save it if it's the best combination so far
                if (trades[indexModify].profit > bestCombinationProfit) {
                    bestCombinationProfit = trades[indexModify].profit
                    bestCombinationIndex  = indexModify
                }

                // We did a modification, thus a new combination might be possible
                modified = true
            }
        }
        iteration++
        
    } while(modified)

    logTradeGroup(trades[bestCombinationIndex], tty)

    return bestCombinationProfit
}

export { combinatorial }