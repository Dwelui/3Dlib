export default class Vector extends Float64Array {
    /**
    * @param {number[]} values
    * @param {number} [length]
    */
    constructor(values, length) {
        super(length ?? values.length)
        this.set(values)
    }

    floor() {
        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] = this[i] | 0

        return this
    }

    toArray() { return [...this] }

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
}
