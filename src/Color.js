export default class Color extends Uint8ClampedArray {
    /**
    * @param {number} [r=0] Red component (0–255); Defaults to 0.
    * @param {number} [g=0] Green component (0–255); Defaults to 0.
    * @param {number} [b=0] Blue component (0–255); Defaults to 0.
    * @param {number} [a=255] Alpha component (0–255); Defaults to 255.
    */
    constructor(r = 0, g = 0, b = 0, a = 255) {
        super(4)

        this[0] = r, this[1] = g, this[2] = b, this[3] = a
    }

    get r() { return this[0] }
    /** @param {number} number - Must be between 0 and 255. */
    set r(number) { this[0] = number }

    get g() { return this[1] }
    /** @param {number} number - Must be between 0 and 255. */
    set g(number) { this[1] = number }

    get b() { return this[2] }
    /** @param {number} number - Must be between 0 and 255. */
    set b(number) { this[2] = number }

    get a() { return this[3] }
    /** @param {number} number - Must be between 0 and 255. */
    set a(number) { this[3] = number }

    get hex() {
        /** @type {(value: number) => string} */
        const toHex = value => Math.round(value).toString(16).padStart(2, "0")

        return `#${toHex(this[0])}${toHex(this[1])}${toHex(this[2])}${toHex(this[3])}`
    }

    toArray() { return [...this] }

    /** @param {number} scalar */
    multiplyScalar(scalar) {
        const l = this.length
        for (let i = 0; i < l; i++)
            this[i] *= scalar

        return this
    }
}
