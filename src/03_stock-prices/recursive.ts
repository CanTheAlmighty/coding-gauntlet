import { Solution } from "00_definition/Problem"

const opportunity = (prices: Array<number>, operation: 'buy' | 'sell', pivot: number): number => {
    let best = {
        index: 0,
        profit: 0
    }

    for (let index=pivot; index < prices.length; index++) {
        switch (operation) {
            case 'buy': {
                // Try to buy the current one and sell in any of the next indices
                best.index = opportunity(prices, 'sell', index+1)
            }; break
            case 'sell': {
                // Check if we sell now, how much we earn for the current day
                const profitSellNow = prices[index] - prices[pivot]

                // But what if we sold the other days? (only matters after 2 days: one day to buy, other to sell)
                if (index > pivot+1) {
                    // Check if it was more profitable 
                    opportunity(prices, 'buy', index-1)
                }

                // Simple "maximum" finder
                if (profitSellNow > best.profit) {
                    best.index = index
                    best.profit = profitSellNow
                }
            }; break;
        }
    }

    return 0
}

const recursive: Solution = (tty) => {
    opportunity([7,1,5,3,6,4], 'buy', 0)
}

export { recursive }
