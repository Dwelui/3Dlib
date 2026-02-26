import Vector from "./Vector.js"

export default class Vector2 extends Vector {

    /**
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    constructor(x = 0, y = 0) {
        super([x, y], 2)
    }

    get x() { return this[0] }
    set x(number) { (this[0]) = number }

    get y() { return this[1] }
    set y(number) { (this[1]) = number }
}
