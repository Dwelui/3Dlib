export default class Vector extends Float64Array {
    static SIZE = Infinity

    /**
     * @overload
     * @param {Array<number|undefined>} values
     * @param {number} [length]
     *
     * @overload
     * @param {Vector} vector
     */

    /** @param {...(any)} args */
    constructor(...args) {
        /** @type {(number|undefined)[]} */
        let values = []
        let l = undefined

        if (Array.isArray(args[0]))
            values = Array.isArray(args[0][0]) ? args[0][0] : args[0]

        if (args[0][0] instanceof Vector)
            values = args[0][0].toArray()
        else if (args[0] instanceof Vector)
            values = args[0].toArray()

        if (new.target.SIZE !== Infinity)
            l = new.target.SIZE
        else if (typeof args[1] === "number")
            l = args[1]
        else
            l = values.length

        super(l)
        for (let i = 0; i < l; i++) {
            this[i] = values[i] ?? 0
        }
    }

    get magnitude() {
        const l = this.length

        let result = 0
        for (let i = 0; i < l; i++)
            result += this[i] * this[i]

        return Math.sqrt(result)
    }

    floor() {
        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] = this[i] | 0

        return this
    }

    toArray() { return [...this] }

    /** @returns {this} */
    // @ts-ignore
    clone() { return new this.constructor([...this]) }

    normalize() {
        const vl = this.magnitude
        if (vl !== 0)
            this.divideScalar(vl)

        return this
    }

    invert() {
        this.multiplyScalar(-1)

        return this
    }

    /** @param {number} scalar */
    multiplyScalar(scalar) {
        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] *= scalar

        return this
    }

    /** @param {number} scalar */
    divideScalar(scalar) {
        if (scalar === 0)
            throw new Error("Vector: division by zero")

        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] /= scalar

        return this
    }

    /** @param {this} vector */
    add(vector) {
        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] += vector[i]

        return this
    }

    /** @param {this} vector */
    sub(vector) {
        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] -= vector[i]

        return this
    }

    /** @param {this} vector */
    multiplyVector(vector) {
        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] *= vector[i]

        return this
    }
}
