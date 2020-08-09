
import type { Terminal } from 'terminal-kit'

export interface Problem {
    title: string
    description: string
    solutions: {
        [title: string]: (output: Terminal) => void
    }
}