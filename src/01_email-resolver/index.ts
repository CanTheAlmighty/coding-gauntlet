import { Terminal } from 'terminal-kit'
import { Problem } from '../00_definition/Problem'

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

const main = (tty: Terminal) => {
    const allMails = ["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]
    const resolve = emailMultiResolve(allMails)

    tty('From all mails: ', allMails)
    tty(`\nOnly ${ resolve.length } of them receive:`, resolve)
}

// MARK: -  Export

const problem: Problem = {
    title: 'Email Uniqueness',
    description: 'Find all unique emails regardless of + or .',
    solutions: { main }
}

export default problem