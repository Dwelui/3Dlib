import { describe, expect, test } from "vitest";
import Matrix from "../../../src/math/Matrix.js";

/**
 * @template T
 * @param {new (values: number[], rows?: number, cols?: number) => T} constructor
 * @param {number[]} values
 * @param {number} [rows]
 * @param {number} [cols]
 * @returns {{ actualMatrix: T, expectedRows: number, expectedCols: number }}
 */
const constructFromArrayValues = function(constructor, values, rows, cols) {
    let matrix = null

    if (rows === undefined || cols === undefined) {
        matrix = new constructor(values)
        const expectedDimensions = Math.sqrt(values.length)
        rows = cols = expectedDimensions
    } else {
        matrix = new constructor(values, rows, cols)
    }

    return {
        actualMatrix: matrix,
        expectedRows: rows,
        expectedCols: cols,
    }
}

describe('Matrix', () => {
    describe('construction & conversion', () => {
        const arrayInputs = [
            { values: [1, 2, 3, 4], constructor: Matrix },
            { values: [1, 2, 3, 4], rows: 4, cols: undefined, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: undefined, cols: 2, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: 4, cols: 1, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: 1, cols: 4, constructor: Matrix },
            { values: [1, 2, 3, 4], rows: 2, cols: 2, constructor: Matrix },
            { values: [1, 2, 3, 4, 5, 6, 7, 8, 9], constructor: Matrix },
        ]

        test.for(arrayInputs)('constructor ($constructor) creates from array with correct values', ({ values, rows, cols, constructor }) => {
            const { actualMatrix, expectedRows, expectedCols } = constructFromArrayValues(constructor, values, rows, cols)

            expect([...actualMatrix]).toEqual(values)
            expect(actualMatrix.rows).toEqual(expectedRows)
            expect(actualMatrix.cols).toEqual(expectedCols)
        })

        test.for(arrayInputs)('toArray returns correct values ($values)', ({ values, rows, cols, constructor }) => {
            const { actualMatrix } = constructFromArrayValues(constructor, values, rows, cols)

            expect(actualMatrix.toArray()).toEqual(values)
        })

        test.for(arrayInputs)('clone keeps correct type ($constructor)', ({ values, rows, cols, constructor }) => {
            const { actualMatrix } = constructFromArrayValues(constructor, values, rows, cols)

            expect(actualMatrix.clone()).toBeInstanceOf(actualMatrix.constructor)
        })

        test.for(arrayInputs)('clone keeps correct values ($values) ($constructor)', ({ values, rows, cols, constructor }) => {
            const { actualMatrix } = constructFromArrayValues(constructor, values, rows, cols)

            expect(actualMatrix.clone().toArray()).toEqual(values)
        })

        test.for(arrayInputs)('($values) toJSON returns correct json', ({ values, rows, cols, constructor }) => {
            if (rows === undefined || cols === undefined) {
                const expectedDimensions = Math.sqrt(values.length)
                rows = cols = expectedDimensions
            }

            const matrixObject = {
                values: Object.fromEntries(
                    values.map((v, i) => [String(i), v])
                ),
                rows,
                cols
            }

            const { actualMatrix } = constructFromArrayValues(constructor, values, rows, cols)

            expect(actualMatrix.toJSON()).toEqual(matrixObject)
        })

        test.for(arrayInputs)('($values) fromJSON creates correct matrix', ({ values, rows, cols, constructor }) => {
            if (rows === undefined || cols === undefined) {
                const expectedDimensions = Math.sqrt(values.length)
                rows = cols = expectedDimensions
            }

            const matrixObject = {
                values: Object.fromEntries(
                    values.map((v, i) => [String(i), v])
                ),
                rows,
                cols
            }

            const m = constructor.fromJSON(matrixObject)

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
    })
})
