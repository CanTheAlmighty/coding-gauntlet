
const minimizeArray = (array: Array<number>): number => {
    let headWrite = 0
    let lastValue = array[0]

    for (let headRead=0; headRead < array.length; headRead++) {
        const value = array[headRead]

        if (lastValue == value) {
            // We found repetitions, don't do anything
            continue
        }
        else if (lastValue < array[headRead]) {
            // We found an increment, save it on the left.
            headWrite += 1
            array[headWrite] = value
        }

        lastValue = value
    }

    // Slice the remaining values
    array.splice(headWrite, array.length - headWrite)

    return headWrite
}

const main = () => {
    let test = [0,0,1,1,1,2,2,3,3,4]

    console.log(`Input: ${ test }`)

    const uniqueLength = minimizeArray(test)

    console.log(`Minimized Output (length: ${ uniqueLength }) : ${ test }`)
}

export { main }