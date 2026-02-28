import { describe, test, expect } from "vitest"
import Vector2 from "../../../src/math/Vector2.js"
import Vector3 from "../../../src/math/Vector3.js"
import Vector4 from "../../../src/math/Vector4.js"
import Vector from "../../../src/math/Vector.js"

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
    describe('arithmetics', () => {
        describe('scalar', () => {
            const inputs = [
                { vector: [1, 1], scalar: 2, },
                { vector: [-3, 4], scalar: -1, },
                { vector: [1, 2, 3, 4], scalar: 10, },
            ]

            /** @param {(value: number, scalar: number) => number} operation */
            function testCases(operation) {
                return inputs.map(({ vector, scalar }) => ({
                    vector,
                    scalar,
                    expected: vector.map((v) => operation(v, scalar))
                }))
            }

            describe('multiplication', () => {
                test.for(testCases((v, s) => v * s))('($vector) * $scalar => ($expected)', ({ vector, scalar, expected }) => {
                    const v = new Vector(vector).multiplyScalar(scalar)

                    expect([...v]).toEqual(expected)
                })
            })

            describe('division', () => {
                test.for(testCases((v, s) => v / s))('($vector) / $scalar => ($expected)', ({ vector, scalar, expected }) => {
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

        describe('vector', () => {
            const inputs = [
                { a: [1, 1], b: [1, 3], constructor: Vector2 },
                { a: [-3, 4, 2], b: [-3, 1, 2], constructor: Vector3 },
                { a: [-3, 4, 2, 0], b: [- 6, 2, 2, 10], constructor: Vector4 },
                { a: [- 3, 4, 2, 0], b: [- 6, 2, 2, 10], constructor: Vector },
            ]

            /** @param {(aComponent: number, bComponent: number) => number} operation */
            function testCases(operation) {
                return inputs.map(({ a, b, constructor }) => {
                    const expectedComponents = []
                    for (let i = 0; i < a.length; i++) {
                        expectedComponents.push(operation(a[i], b[i]))
                    }

                    return {
                        a: new constructor(a),
                        b: new constructor(b),
                        expected: new constructor(expectedComponents)
                    }
                })
            }

            describe('addition', () => {
                test.for(testCases(((ac, bc) => ac + bc)))('($a) + ($b) => ($expected)', ({ a, b, expected }) => {
                    const v = a.add(b)

                    expect(v).toEqual(expected)
                })
            })

            describe('subtraction', () => {
                test.for(testCases(((ac, bc) => ac - bc)))('($a) - ($b) => ($expected)', ({ a, b, expected }) => {
                    const v = a.sub(b)

                    expect(v).toEqual(expected)
                })
            })

            describe('multiply', () => {
                test.for(testCases(((ac, bc) => ac * bc)))('($a) - ($b) => ($expected)', ({ a, b, expected }) => {
                    const v = a.multiplyVector(b)

                    expect(v).toEqual(expected)
                })
            })
        })
    })

    describe('modification', () => {
        const inputs = [
            { vector: new Vector2(1, 2) },
            { vector: new Vector2(-0.1, -1.2) },
            { vector: new Vector3(1, 2, 3) },
            { vector: new Vector3(1.5, 2.2, 3.9) },
            { vector: new Vector4(1, 2, 3, 4) },
            { vector: new Vector([1, 2, 3, 4, 5]) },
        ]

        /** @param {(value: number) => number} operation */
        function testCases(operation) {
            return inputs.map(({ vector }) => {
                const expectedComponents = []
                for (let i = 0; i < vector.length; i++) {
                    expectedComponents.push(operation(vector[i]))
                }

                //@ts-ignore
                const expected = new vector.constructor(expectedComponents)

                return {
                    vector: vector.clone(),
                    expected
                }
            })
        }

        test.for(testCases((v) => v | 0))('($vector) floored to ($expected) correctly', ({ vector, expected }) => {
            expect(vector.floor().toArray()).toEqual(expected.toArray())
        })

        test.for(testCases((v) => -v))('($vector) invert correctly ($expected)', ({ vector, expected }) => {
            expect(vector.invert().toArray()).toEqual(expected.toArray())
        })

        test.for([
            { vector: new Vector2(1, 2), expected: 2.23606797749979 },
            { vector: new Vector3(1, 2, 3), expected: 3.7416573867739413 },
            { vector: new Vector4(1, 2, 3, 4), expected: 5.477225575051661 },
            { vector: new Vector([1, 2, 3, 4, 5]), expected: 7.416198487095663 },
        ])('($vector) length calculated correctly ($expected)', ({ vector, expected }) => {
            expect(vector.magnitude).toEqual(expected)
        })

        test.for([
            { vector: new Vector2(1, 2) },
            { vector: new Vector3(1, 2, 3) },
            { vector: new Vector4(1, 2, 3, 4) },
            { vector: new Vector([1, 2, 3, 4, 5]) },
        ])('($vector) normalize correctly', ({ vector }) => {
            expect(vector.normalize().magnitude).toBeCloseTo(1)
        })
    })

    describe('construction & conversion', () => {
        const inputs = [
            { values: [1, 2], constructor: Vector2 },
            { values: [1, 2, 3], constructor: Vector3 },
            { values: [1, 2, 3, 4], constructor: Vector4 },
            { values: [1, 2, 3, 4, 5], constructor: Vector },
        ]

        test.for(inputs)('toArray returns correct values ($values)', ({ values, constructor }) => {
            const v = new constructor(values)

            expect(v.toArray()).toEqual(values)
        })

        test.for(inputs)('clone keeps correct type ($constructor)', ({ values, constructor }) => {
            const v = new constructor(values)

            expect(v.clone()).toBeInstanceOf(v.constructor)
        })

        test.for(inputs)('clone keeps correct values ($values) ($constructor)', ({ values, constructor }) => {
            const v = new constructor(values)

            expect(v.clone().toArray()).toEqual(values)
        })

        const constructorInputs = [
            { vector: new Vector2(1, 2), constructor: Vector },
            { vector: new Vector2(1, 2), constructor: Vector3 },
            { vector: new Vector3(1, 2, 3), constructor: Vector2 },
            { vector: new Vector3(1, 2, 3), constructor: Vector4 },
            { vector: new Vector4(1, 2, 3, 4), constructor: Vector3 },
            { vector: new Vector4(1, 2, 3, 4), constructor: Vector },
            { vector: new Vector([1, 2, 3, 4, 5]), constructor: Vector4 },
            { vector: new Vector([1, 2, 3, 4, 5]), constructor: Vector3 },
        ]

        function constructorTestCases() {
            return constructorInputs.map(({ vector, constructor }) => {
                const expectedComponents = []

                const expectedLength = Math.min(vector.length, constructor.SIZE)
                for (let i = 0; i < expectedLength; i++) {
                    expectedComponents.push(vector[i])
                }

                return {
                    vector: vector.clone(),
                    constructor,
                    // @ts-ignore
                    expected: new constructor(expectedComponents)
                }
            })
        }

        test.for(constructorTestCases())(
            'constructor ($constructor) creates from other vector ($vector) with correct values ($expected)',
            ({ vector, constructor, expected }) => {
                const v = new constructor(vector)

                expect(v.toArray()).toEqual(expected.toArray())
            })

        test.for([
            { vector: { x: 1, y: 2 }, contructor: Vector2 },
            { vector: { x: 1, y: 2, z: 3 }, contructor: Vector3 },
            { vector: { x: 1, y: 2, z: 3, w: 4 }, contructor: Vector4 },
        ])('toJSON returns correct json ($vector)', ({ vector, contructor }) => {
            const json = new contructor(...Object.values(vector)).toJSON()

            // @ts-ignore
            validateComponents(json, vector)
        })

        test.for([
            { vector: { x: 1, y: 2 }, contructor: Vector2 },
            { vector: { x: 1, y: 2, z: 3 }, contructor: Vector3 },
            { vector: { x: 1, y: 2, z: 3, w: 4 }, contructor: Vector4 },
        ])('fromJSON creates correct vector ($vector)', ({ vector, contructor }) => {
            const json = contructor.fromJSON(vector)

            // @ts-ignore
            validateComponents(json, vector)
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
