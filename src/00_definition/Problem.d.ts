
import type { Terminal } from 'terminal-kit'

export interface Solution {
    (output: Terminal): void
}

export interface Problem {
    title: string
    description: string
    solutions: {
        [title: string]: Solution
    }
}