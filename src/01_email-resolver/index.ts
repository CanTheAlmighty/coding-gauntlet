// Common
import { Problem, Solution } from '../00_common/Excercise'
import { tty } from '../00_common/Terminal'

const emailResolve = (email: string): string => {
    let [ owner, domain ] = email.split('@')

    // Ignore everything after the first +
    owner = owner.split('+')[0]

    // Replace all the instances of '.' with nothing
    owner = owner.replace(/\./g, '')

    return `${ owner }@${ domain }`
}

const emailMultiResolve = (emails: Array<string>): Array<string> => {
    let resolved = new Set<string>()

    for (const email of emails) {
        resolved.add(emailResolve(email))
    }

    return [ ...resolved.keys()]
}

// MARK: - Run

const main: Solution<Array<string>, number> = (allMails) => {
    const resolve = emailMultiResolve(allMails)

    tty('From all mails: ', allMails)
    tty(`\nOnly ${ resolve.length } of them receive:`, resolve)

    return resolve.length
}

// MARK: -  Export

const problem: Problem<Array<string>, number> = {
    title: 'Email Uniqueness',
    description: 'Find all unique emails regardless of + or .',
    solutions: { main },
    tests: [
        { 
            argument: ["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"],
            expected: 2
        }
    ]
}

export default problem