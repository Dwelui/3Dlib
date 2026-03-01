import { describe, expect, test } from "vitest";
import Matrix from "../../../src/math/Matrix.js";

describe('Matrix', () => {
    describe('construction & conversion', () => {
        const arrayInputs = [
            { values: [1, 2, 3, 4], rows: undefined, cols: undefined, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: 4, cols: undefined, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: undefined, cols: 2, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: 4, cols: 1, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: 2, cols: 2, constructor: Matrix },
        ]

        test.for(arrayInputs)('constructor ($constructor) creates from array with correct values', ({ values, rows, cols, constructor }) => {
            let m = null

            if (rows === undefined || cols === undefined) {
                m = new constructor(values)
                const expectedDimensions = Math.sqrt(values.length)
                rows = cols = expectedDimensions
            } else {
                m = new constructor(values, rows, cols)
            }

            expect([...m]).toEqual(values)
            expect(m.rows).toEqual(rows)
            expect(m.cols).toEqual(cols)
        })

        const matrixInputs = [
            { matrix: new Matrix([1, 2, 3, 4]), constructor: Matrix },
            { matrix: new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]), constructor: Matrix },
            { matrix: new Matrix([1, 2, 3, 4, 5, 6], 3, 2), constructor: Matrix },
        ]

        test.for(matrixInputs)('constructor ($constructor) creates from matrix with correct values', ({ matrix, constructor }) => {
            const m = new constructor(matrix)

            expect([...m]).toEqual([...matrix])
            expect(m.rows).toEqual(matrix.rows)
            expect(m.cols).toEqual(matrix.cols)
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
