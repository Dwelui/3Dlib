import Matrix3 from "./Matrix3.js"
import Vector3 from "./Vector3.js"

export default class Matrix4 {
    /** @type{Array<number>} */ #components

    /** @param {Array<number>} [components] */
    constructor(components) {
        if (
            Array.isArray(components) &&
            components.length === 16 &&
            components.every(c => typeof c === 'number')
        ) {
            this.#components = components
        } else if (typeof components === 'undefined') {
            this.#components = Matrix4.zero().toArray()
        } else {
            console.assert(false, components)
            throw TypeError(`Bad '...components' parameter ${components}`)
        }
    }

    toArray() {
        return this.#components.slice()
    }

    static zero() {
        return new Matrix4([
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ])
    }

    static identity() {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ])
    }

    /** @param {Matrix3} m3 */
    static fromMatrix3(m3) {
        const m3Components = m3.toArray()

        return new Matrix4([
            m3Components[0], m3Components[1], m3Components[2], 0,
            m3Components[3], m3Components[4], m3Components[5], 0,
            m3Components[6], m3Components[7], m3Components[8], 0,
            0, 0, 0, 1,
        ])
    }

    /** @param {Vector3} v3 */
    static fromVector3(v3) {
        const v3Components = v3.toArray()

        return new Matrix4([
            1, 0, 0, v3Components[0],
            0, 1, 0, v3Components[1],
            0, 0, 1, v3Components[2],
            0, 0, 0, 1,
        ])
    }

    /**
    * @param {Matrix4} a
    * @param {Matrix4} b
    * @returns {Matrix4}
    */
    static multiplyMatrix4(a, b) {
        const ac = a.#components
        const bc = b.#components

        return new Matrix4([
            ac[0] * bc[0] + ac[1] * bc[4] + ac[2] * bc[8] + ac[3] * bc[12],
            ac[0] * bc[1] + ac[1] * bc[5] + ac[2] * bc[9] + ac[3] * bc[13],
            ac[0] * bc[2] + ac[1] * bc[6] + ac[2] * bc[10] + ac[3] * bc[14],
            ac[0] * bc[3] + ac[1] * bc[7] + ac[2] * bc[11] + ac[3] * bc[15],

            ac[4] * bc[0] + ac[5] * bc[4] + ac[6] * bc[8] + ac[7] * bc[12],
            ac[4] * bc[1] + ac[5] * bc[5] + ac[6] * bc[9] + ac[7] * bc[13],
            ac[4] * bc[2] + ac[5] * bc[6] + ac[6] * bc[10] + ac[7] * bc[14],
            ac[4] * bc[3] + ac[5] * bc[7] + ac[6] * bc[11] + ac[7] * bc[15],

            ac[8] * bc[0] + ac[9] * bc[4] + ac[10] * bc[8] + ac[11] * bc[12],
            ac[8] * bc[1] + ac[9] * bc[5] + ac[10] * bc[9] + ac[11] * bc[13],
            ac[8] * bc[2] + ac[9] * bc[6] + ac[10] * bc[10] + ac[11] * bc[14],
            ac[8] * bc[3] + ac[9] * bc[7] + ac[10] * bc[11] + ac[11] * bc[15],

            ac[12] * bc[0] + ac[13] * bc[4] + ac[14] * bc[8] + ac[15] * bc[12],
            ac[12] * bc[1] + ac[13] * bc[5] + ac[14] * bc[9] + ac[15] * bc[13],
            ac[12] * bc[2] + ac[13] * bc[6] + ac[14] * bc[10] + ac[15] * bc[14],
            ac[12] * bc[3] + ac[13] * bc[7] + ac[14] * bc[11] + ac[15] * bc[15],
        ])
    }
}
