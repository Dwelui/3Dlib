import Vector from "./Vector.js"

export default class Vector4 extends Vector {
    static SIZE = 4

    /**
     * @overload
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     * @param {number} [w=0]
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

        for (let i = 0; i < Vector4.SIZE; i++) {
            values[i] = values[i] ?? 0
        }

        //@ts-ignore
        super(values, Vector4.SIZE)
    }

    get x() { return this[0] }
    set x(number) { (this[0]) = number }

    get y() { return this[1] }
    set y(number) { (this[1]) = number }

    get z() { return this[2] }
    set z(number) { (this[2]) = number }

    get w() { return this[3] }
    set w(number) { (this[3]) = number }

    toJSON() { return { x: this[0], y: this[1], z: this[2], w: this[3] } }
}
