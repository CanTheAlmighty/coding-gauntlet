
import TerminalKit from 'terminal-kit'
const tty = TerminalKit.terminal

import { startCase } from 'lodash'

import { Problem } from '00_definition/Problem'

import problem01 from './01_email-resolver'
import problem02 from './02_array-minimizer'
import problem03 from './03_stock-prices'

const problems: Array<Problem> = [
    problem01, problem02, problem03
]

tty.on('key', (key: string, matches: any, data: any) => {
    switch (key) {
        case 'CTRL_C':
        case 'CTRL_D':
            tty.grabInput(false)
            process.exit()
    }
})

const main = async () => {
    let running = true

    tty.windowTitle('Coding Gauntlet')
    tty.eraseDisplay()

    while (running) {
        tty.saveCursor()
        tty.cyan('Pick the problem from the list to view its solution:')
        tty.nextLine(1)
        
        const choice = await tty.singleColumnMenu(problems.map(p => p.title), { leftPadding: '  * ' }).promise
        const problem = problems[choice.selectedIndex]
        
        const solutionKeys = Object.keys(problem.solutions)
        let solutionSelectedKey: string | undefined = undefined
        
        // Insta-pick the only one solution, or offer a list of soutions
        if (solutionKeys.length === 1) {
            solutionSelectedKey = solutionKeys[0] as string
        } else {
            tty.cyan('\nThis problem offers multiple solutions:\n')
            solutionSelectedKey = (await tty.singleColumnMenu(solutionKeys, { leftPadding: '    * ' }).promise).selectedText
        }
        
        const solution = problem.solutions[solutionSelectedKey]
        
        // Run the solution
        tty.cyan('\nExecuting problem ').cyan.bold(problem.title).cyan(' with solution ').cyan.bold(startCase(solutionSelectedKey))
        tty.cyan('\n---------------- START ----------------\n')
        solution(tty)
        tty.cyan('\n----------------- END -----------------\n')
        tty.cyan('Press ').cyan.bold('Any Key').cyan(' to go back\n')

        await tty.inputField({ }).promise
        tty.restoreCursor()
        tty.eraseDisplayBelow()
    }
}

main().then().catch()
