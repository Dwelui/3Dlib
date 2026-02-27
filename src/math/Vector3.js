import Vector from "./Vector.js"

export default class Vector3 extends Vector {
    static SIZE = 3

    /**
     * @overload
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     */

    /**
     * @overload
     * @param {Array<number|undefined>} values
     */

    /** @param {...(number | undefined | Array<number | undefined>)} args */
    constructor(...args) {
        const values =
            args.length === 1 && Array.isArray(args[0])
                ? args[0]
                : args

        for (let i = 0; i < Vector3.SIZE; i++) {
            values[i] = values[i] ?? 0
        }

        //@ts-ignore
        super(values, Vector3.SIZE)
    }

    get x() { return this[0] }
    set x(number) { (this[0]) = number }

    get y() { return this[1] }
    set y(number) { (this[1]) = number }

    get z() { return this[2] }
    set z(number) { (this[2]) = number }

    toJSON() { return { x: this[0], y: this[1], z: this[2] } }

    // /** @param {Vector3} vector */
    // add(vector) {
    //     this.x += vector.x
    //     this.y += vector.y
    //     this.z += vector.z
    // }
    //
    // /** @param {Vector3} vector */
    // subtract(vector) {
    //     this.x -= vector.x
    //     this.y -= vector.y
    //     this.z -= vector.z
    // }
    //
    // /** @param {number} number */
    // multiplyScalar(number) {
    //     this.x *= number
    //     this.y *= number
    //     this.z *= number
    // }
    //
    // /** @param {Matrix3} matrix */
    // multiplyMatrix3(matrix) {
    //     const m = matrix.toArray()
    //     const x = this.x, y = this.y, z = this.z
    //
    //     this.x = m[0] * x + m[1] * y + m[2] * z
    //     this.y = m[3] * x + m[4] * y + m[5] * z
    //     this.z = m[6] * x + m[7] * y + m[8] * z
    // }
    //
    // /**
    // * @param {{
    // *       x?: number,
    // *       y?: number,
    // *       z?: number,
    // *   }} [object]
    // */
    // static fromJSON({ x, y, z } = {}) {
    //     return new Vector3(x, y, z)
    // }
    //
    // /** @param {Vector3} vector */
    // static normalize(vector) {
    //     const x = vector.x, y = vector.y, z = vector.z
    //     const inv = 1 / Math.sqrt(x * x + y * y + z * z)
    //
    //     if (inv !== Infinity) {
    //         vector.x = x * inv
    //         vector.y = y * inv
    //         vector.z = z * inv
    //     }
    //     return vector
    // }
    //
    // /** @param {Vector3} vector */
    // static invert(vector) {
    //     vector.x = -vector.x
    //     vector.y = -vector.y
    //     vector.z = -vector.z
    //     return vector
    // }
    //
    // /**
    // * @param {Vector3} a
    // * @param {Vector3} b
    // */
    // static add(a, b) {
    //     return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z)
    // }
    //
    // /**
    // * @param {Vector3} vector
    // * @param {number} number
    // */
    // static multiplyScalar(vector, number) {
    //     return new Vector3(vector.x * number, vector.y * number, vector.z * number)
    // }
    //
    // /**
    // * @param {Vector3} a
    // * @param {Vector3} b
    // */
    // static subtract(a, b) {
    //     return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z)
    // }
    //
    // /**
    // * @param {Vector3} a
    // * @param {Vector3} b
    // */
    // static dot(a, b) {
    //     return a.x * b.x + a.y * b.y + a.z * b.z
    // }
}
