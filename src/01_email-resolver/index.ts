
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

const main = () => {
    const allMails = ["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]
    const resolve = emailMultiResolve(allMails)

    console.log('From all mails: ', allMails)
    console.log(`Only ${ resolve.length } of them receive:`, resolve)
}


export { main }