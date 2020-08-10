export interface Test<T,R> {
    argument: T
    expected: R
}

export interface Solution<T,R> {
    (test: T): R
}

export interface Problem<T,R> {
    title: string
    description: string
    solutions: {
        [title: string]: Solution<T,R>
    }
    tests: Array<Test<T,R>>
}