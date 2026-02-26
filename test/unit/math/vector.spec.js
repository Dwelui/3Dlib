import { describe, test, expect } from "vitest";
import Vector2 from "../../../src/math/Vector2.js";
import Vector3 from "../../../src/math/Vector3.js";
import Vector4 from "../../../src/math/Vector4.js";
import Vector from "../../../src/math/Vector.js";

/**
 * @param {Vector2|Vector3|Vector4} vector
 * @param {Record<string, number>} expected
 */
const validateComponents = (vector, expected) => {
    for (const [key, value] of Object.entries(expected)) {
        // @ts-ignore
        expect(vector[key]).toBe(value)
    }
}

describe('Vector', () => {
    describe('scalar', () => {
        const scalarInputs = [
            { vector: [1, 1], scalar: 2, },
            { vector: [-3, 4], scalar: -1, },
            { vector: [1, 2, 3, 4], scalar: 10, },
        ]

        /** @param {(value: number, scalar: number) => number} operation */
        function scalarTestCases(operation) {
            return scalarInputs.map(({ vector, scalar }) => ({
                vector,
                scalar,
                expected: vector.map((v) => operation(v, scalar))
            }))
        }

        describe('multiplication', () => {
            test.for(scalarTestCases((v, s) => v * s))('($vector) * $scalar => ($expected)', ({ vector, scalar, expected }) => {
                const v = new Vector(vector).multiplyScalar(scalar)

                expect([...v]).toEqual(expected)
            })
        })

        describe('division', () => {
            test.for(scalarTestCases((v, s) => v / s))('($vector) / $scalar => ($expected)', ({ vector, scalar, expected }) => {
                const v = new Vector(vector).divideScalar(scalar)

                expect([...v]).toEqual(expected)
            })

            test('by zero throws error', () => {
                expect(() => {
                    new Vector([0, 0]).divideScalar(0)
                }).toThrow("Vector: division by zero")
            })
        })
    })

    describe('modification', () => {
        const modificationInputs = [
            { vector: [1.5, 2.2, 3.9] },
            { vector: [-0.1, -1.2] },
        ]

        /** @param {(value: number) => number} operation */
        function modificationTestCases(operation) {
            return modificationInputs.map(({ vector }) => ({
                vector,
                expected: vector.map((v) => operation(v))
            }))
        }

        test.for(modificationTestCases((v) => v | 0))('($vector) floored to ($expected) correctly', ({ vector, expected }) => {
            const v = new Vector(vector).floor();

            expect(v.toArray()).toEqual(expected)
        })
    })

    describe('construction & conversion', () => {
        test.for([
            { vector: [1, 2, 3] },
            { vector: [1, 2, 3, 4, 5] },
            { vector: [1, 2] },
        ])('toArray returns correct values ($vector)', ({ vector }) => {
            const v = new Vector(vector);

            expect(v.toArray()).toEqual(vector)
        })
    })
})

describe('Vector2', () => {
    describe('getters return the same values after setting with', () => {
        const cases = [
            { x: 1, y: 1 },
            { x: -5, y: 42 },
        ]

        describe('constructor', () => {
            test.for(cases)('($x, $y)', (values) => {
                const v2 = new Vector2(...Object.values(values))

                validateComponents(v2, values)
            })
        })

        describe('setters', () => {
            test.for(cases)('($x, $y)', (values) => {
                const v2 = new Vector2()
                v2.x = values.x
                v2.y = values.y

                validateComponents(v2, values)
            })
        })
    })
})

describe('Vector3', () => {
    describe('getters return the same values after setting with', () => {
        const cases = [
            { x: 1, y: 1, z: 1 },
            { x: -5, y: 42, z: 100 },
        ]

        describe('constructor', () => {
            test.for(cases)('($x, $y, $z)', (values) => {
                const v3 = new Vector3(...Object.values(values))

                validateComponents(v3, values)
            })
        })

        describe('setters', () => {
            test.for(cases)('($x, $y, $z) ', (values) => {
                const v3 = new Vector3()
                v3.x = values.x
                v3.y = values.y
                v3.z = values.z

                validateComponents(v3, values)
            })
        })
    })
})

describe('Vector4', () => {
    describe('getters return the same values after setting with', () => {
        const cases = [
            { x: 1, y: 1, z: 1, w: 1 },
            { x: -5, y: 42, z: 100, w: -1 },
        ]

        describe('constructor', () => {
            test.for(cases)('($x, $y, $z, $w)', (values) => {
                const v4 = new Vector4(...Object.values(values))

                validateComponents(v4, values)
            })
        })

        describe('setters', () => {
            test.for(cases)('($x, $y, $z, $w)', (values) => {
                const v4 = new Vector4()
                v4.x = values.x
                v4.y = values.y
                v4.z = values.z
                v4.w = values.w

                validateComponents(v4, values)
            })
        })
    })
})
