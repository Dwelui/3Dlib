import Vector from "./Vector.js"

export default class Vector2 extends Vector {
    static SIZE = 2

    /**
     * @overload
     * @param {number} [x=0]
     * @param {number} [y=0]
     *
     * @overload
     * @param {Array<number|undefined>} values
     *
     * @overload
     * @param {Vector} vector
     */

    /** @param {any} args */
    constructor(...args) {
        super(args)
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
