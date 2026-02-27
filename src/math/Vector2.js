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

    /** @param {...(number | undefined | Array<number | undefined>)} args */
    constructor(...args) {
        const values =
            args.length === 1 && Array.isArray(args[0])
                ? args[0]
                : args

        for (let i = 0; i < Vector2.SIZE; i++) {
            values[i] = values[i] ?? 0
        }

        //@ts-ignore
        super(values, Vector2.SIZE)
    }

    get x() { return this[0] }
    set x(number) { (this[0]) = number }

    get y() { return this[1] }
    set y(number) { (this[1]) = number }

    toJSON() { return { x: this.x, y: this.y } }
}
