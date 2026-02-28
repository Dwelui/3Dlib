import Vector from "./Vector.js"

export default class Vector2 extends Vector {
    static SIZE = 2

    /**
     * @overload
     * @param {number} [x=0]
     * @param {number} [y=0]
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

    toJSON() { return { x: this.x, y: this.y } }

    /**
     * @param {Object} [obj={}] - Object containing numeric keys corresponding to vector axes.
     * @param {number} [obj.x]
     * @param {number} [obj.y]
     */
    static fromJSON({ x, y } = {}) {
        return new Vector2(x, y)
    }
}
