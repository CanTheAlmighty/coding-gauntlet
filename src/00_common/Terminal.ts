import TerminalKit from 'terminal-kit'
const tty = TerminalKit.terminal

tty.on('key', (key: string, matches: any, data: any) => {
    switch (key) {
        case 'CTRL_C':
        case 'CTRL_D':
            tty.grabInput(false)
            process.exit()
    }
})

export { tty }