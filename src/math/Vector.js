import Matrix from "./Matrix.js"

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

    /** @param {any} args */
    constructor(...args) {
        /** @type {(number|undefined)[]} */
        let values = []
        let l = undefined

        if (Array.isArray(args[0]))
            values = Array.isArray(args[0][0]) ? args[0][0] : args[0]

        // TODO: .slice() is more performant than [...<arrayBuffer>]
        if (args[0][0] instanceof Vector)
            values = [...args[0][0]]
        else if (args[0] instanceof Vector)
            values = [...args[0]]

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
    clone() { return new this.constructor(this) }

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

    /**
     * @param {Matrix} matrix
     *
     * @returns {Vector} Creates new instance if resulting vector needs resizing.
     */
    multiplyMatrix(matrix) {
        const l = this.length
        const mCols = matrix.cols
        const mRows = matrix.rows

        if (mCols !== l)
            throw new Error(`Vector: multiplying ${this.length} vector with ${matrix.rows}x${matrix.cols} matrix`)

        let result = Array(mRows)
        let sum = 0
        for (let i = 0; i < mRows; i++) {
            for (let y = 0; y < mCols; y++)
                sum += this[y] * matrix[y + i * mCols]
            result[i] = sum
            sum = 0
        }

        if (l !== mRows && this.constructor === Vector) {
            return new Vector(result)
        }

        for (let i = 0; i < mRows; i++)
            this[i] = result[i]

        return this
    }
}
