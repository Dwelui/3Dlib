export default class Vector extends Float64Array {
    /**
    * @param {number[]} values
    * @param {number} [length]
    */
    constructor(values, length) {
        super(length ?? values.length)
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

    clone() { return new Vector([...this]) }

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
