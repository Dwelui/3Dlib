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

    /**
     * @overload
     * @param {Vector} vector
     */

    /** @param {...(number | undefined | Array<number | undefined> | Vector)} args */
    constructor(...args) {
        /** @type {number[]} */
        let values = []

        if (args.length === 1) {
            if (Array.isArray(args[0])) {
                //@ts-ignore
                values = args[0]
            } else if (args[0] instanceof Vector) {
                values = args[0].toArray()
            }
        } else {
            //@ts-ignore
            values = args
        }

        super(values, new.target.SIZE)
    }

    get x() { return this[0] }
    set x(number) { (this[0]) = number }

    get y() { return this[1] }
    set y(number) { (this[1]) = number }

    get z() { return this[2] }
    set z(number) { (this[2]) = number }

    toJSON() { return { x: this[0], y: this[1], z: this[2] } }

    /**
     * @param {Object} [obj={}] - Object containing numeric keys corresponding to vector axes.
     * @param {number} [obj.x]
     * @param {number} [obj.y]
     * @param {number} [obj.z]
     */
    static fromJSON({ x, y, z } = {}) {
        return new Vector3(x, y, z)
    }
}
