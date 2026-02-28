export default class Vector extends Float64Array {
    static SIZE = Infinity

    /**
    * @param {number[]|Vector} values
    * @param {number} [length]
    */
    constructor(values, length) {
        super(length ?? values.length)

        const l = values.length
        for (let i = 0; i < l; i++) {
            values[i] = values[i] ?? 0
        }

        this.set(values)
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
