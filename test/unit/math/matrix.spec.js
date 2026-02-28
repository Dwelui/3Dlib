import { describe, expect, test } from "vitest";
import Matrix from "../../../src/math/Matrix.js";

describe('Matrix', () => {
    describe('construction & conversion', () => {
        const arrayInputs = [
            { values: [1, 2, 3, 4], constructor: Matrix },
        ]

        test.for(arrayInputs)('constructor ($constructor) creates from array with correct values', ({ values, constructor }) => {
            const m = new constructor(values)
            const dimension = Math.sqrt(values.length)

            expect([...m]).toEqual(values)
            expect(m.rows).toEqual(dimension)
            expect(m.cols).toEqual(dimension)
        })

        const matrixInputs = [
            { matrix: new Matrix([1, 2, 3, 4]) }
        ]

        test.for(arrayInputs)('constructor ($constructor) creates from matrix with correct values', ({ values, constructor }) => {
            const m = new constructor(values)
            const dimension = Math.sqrt(values.length)

            expect([...m]).toEqual(values)
            expect(m.rows).toEqual(dimension)
            expect(m.cols).toEqual(dimension)
        })

        test.for([
            { args: [1, 2], constructor: Matrix },
            { args: [1, 2, 3], constructor: Matrix },
            { args: [1, 2, 3, 4], constructor: Matrix },
            { args: [[1], 2], constructor: Matrix },
        ])('constructor ($constructor) throws with incorrect arguments ($args)', ({ args, constructor }) => {
            expect(() => {
                //@ts-ignore
                new constructor(...args)
            }).toThrow("Matrix: invalid arguments provided.")
        })

        test.todo.for(arrayInputs)('toArray returns correct values ($values)', ({ values, constructor }) => { })

        test.todo.for(arrayInputs)('clone keeps correct type ($constructor)', ({ values, constructor }) => { })

        test.todo.for(arrayInputs)('clone keeps correct values ($values) ($constructor)', ({ values, constructor }) => { })

        test.todo.for(arrayInputs)('toJSON returns correct json', ({ values, constructor }) => { })

        test.todo.for(arrayInputs)('fromJSON creates correct matrix', ({ values, constructor }) => { })
    })
})
