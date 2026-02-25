import { describe, test, expect } from "vitest";
import Vector2 from "../../../src/math/Vector2.js";
import Vector3 from "../../../src/math/Vector3.js";
import Vector4 from "../../../src/math/Vector4.js";

/**
 * @param {Vector2|Vector3|Vector4} vector
 * @param {Object} expected
 */
const validateComponents = (vector, expected) => {
    for (const [key, value] of Object.entries(expected)) {
        // @ts-ignore
        expect(vector[key]).toBe(value)
    }
}

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

    describe('multiplication', () => {
        describe('scalar', () => {
            const scalarCases = [
                {
                    vector: { x: 1, y: 1 },
                    scalar: 2,
                    expected: { x: 2, y: 2 },
                },
                {
                    vector: { x: -3, y: 4 },
                    scalar: -1,
                    expected: { x: 3, y: -4 },
                },
            ]
            test.for(scalarCases)(
                '($vector.x, $vector.y) * $scalar => ($expected.x, $expected.y)',
                ({ vector, scalar, expected }) => {
                    const v2 = new Vector2(...Object.values(vector))
                    v2.multiplyScalar(scalar)

                    validateComponents(v2, Object.values(expected))
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

    describe('multiplication', () => {
        describe('scalar', () => {
            const scalarCases = [
                {
                    vector: { x: 1, y: 1, z: 1 },
                    scalar: 2,
                    expected: { x: 2, y: 2, z: 2 },
                },
                {
                    vector: { x: -3, y: 4, z: 100 },
                    scalar: -1,
                    expected: { x: 3, y: -4, z: -100 },
                },
            ]

            test.for(scalarCases)(
                '($vector.x, $vector.y, $vector.z) * $scalar => ($expected.x, $expected.y, $expected.z)',
                ({ vector, scalar, expected }) => {
                    const v3 = new Vector3(...Object.values(vector))
                    v3.multiplyScalar(scalar)

                    validateComponents(v3, Object.values(expected))
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

    describe('multiplication', () => {
        describe('scalar', () => {
            const scalarCases = [
                {
                    vector: { x: 1, y: 1, z: 1, w: 1 },
                    scalar: 2,
                    expected: { x: 2, y: 2, z: 2, w: 2 },
                },
                {
                    vector: { x: -3, y: 4, z: 100, w: -1 },
                    scalar: -1,
                    expected: { x: 3, y: -4, z: -100, w: 1 },
                },
            ]

            test.for(scalarCases)(
                '($vector.x, $vector.y, $vector.z, $vector.w) * $scalar => ($expected.x, $expected.y, $expected.z, $expected.w)',
                ({ vector, scalar, expected }) => {
                    const v4 = new Vector4(...Object.values(vector))
                    v4.multiplyScalar(scalar)

                    validateComponents(v4, Object.values(expected))
                })
        })
    })
})
