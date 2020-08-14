import { startCase } from 'lodash'

// Common
import { Problem, Solution } from './00_common/Excercise'
import { tty } from './00_common/Terminal'

import problem01 from './01_email-resolver'
import problem02 from './02_array-minimizer'
import problem03 from './03_stock-prices'
import problem04 from './04_kmax'
import problem05 from './05_water-pooling'

import problem07 from './07_matrix_zeroer'
import problem08 from './08_anagram_grouper'

const problems: Array<Problem<any,any>> = [
    problem01, problem02, problem03, problem04, problem05, problem07, problem08
]

const main = async () => {
    let running = true

    tty.windowTitle('Coding Gauntlet')
    tty.eraseDisplay()

    while (running) {
        tty.saveCursor()
        tty.cyan('Pick the problem from the list to view its solution:')
        tty.nextLine(1)
        
        const choice = await tty.singleColumnMenu(problems.map((p,i) => `${(i+1).toFixed(0).padStart(3, ' ')}. ${p.title}`), { leftPadding: '  ' }).promise
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
        problem.tests.forEach((test, index) => {
            tty.cyan('<Test #').cyan.bold(index.toFixed(0)).cyan('> argument: ').yellow(test.argument, '\n')

            let result: any = undefined
            
            try {
                result = solution(test.argument)
            }
            catch (error) {
                tty.cyan('\nResult [').red('Failure').cyan('] expected ').yellow(test.expected).cyan(', Solution crashed\n')
                tty.cyan('Error data: ', error.message)
                return
            }

            tty.cyan('\n<Test #').cyan.bold(index.toFixed(0)).cyan('> Result [')
            
            if (typeof result === 'object') {
                tty.yellow('Unknown').cyan('] result is a complex object\n')
            }
            else if (result === test.expected) {
                tty.green('Success').cyan('] value is ').yellow(`${result}\n`)
            }
            else {
                tty.red('Failure').cyan('] expected ').yellow(`${test.expected}`).cyan(' got ').yellow(`${result}\n`)
            }
        })
        tty.cyan('\n----------------- END -----------------\n')
        tty.cyan('Press ').cyan.bold('Any Key').cyan(' to go back\n')

        await tty.inputField({ }).promise
        tty.restoreCursor()
        tty.eraseDisplayBelow()
    }
}

main().then().catch()
