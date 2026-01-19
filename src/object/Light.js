import Object3D from "./Object3D.js"

export default class Light extends Object3D {
    /** @private @type{number} */ #intensity

    /**
    * @param {Vector3} position
    * @param {number} intensity - Must be between 0 and 1.
    */
    constructor(position, intensity) {
        super(position)

        this.intensity = intensity
    }

    get intensity() { return this.#intensity }
    set intensity(intensity) {
        if (typeof intensity !== 'number') throw new TypeError("Parameter 'intensity' is not number")
        if (intensity < 0 || intensity > 1) throw new RangeError("Parameter 'intensity' is not between 0 and 1")
        this.#intensity = intensity
    }
}
