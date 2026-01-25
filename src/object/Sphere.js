import Color from "../math/Color.js"
import Vector3 from "../math/Vector3.js"
import Object3D from "./Object3D.js"

// TODO: Color and Specular properties should be extracted to Material class.
export default class Sphere extends Object3D {
    /** @private @type{number} */ #radius

    /** @private @type{Color} */ #color
    /** @private @type{number} */ #specular
    /** @private @type{number} */ #reflective

    /**
    * @param {Vector3} position
    * @param {number} radius - Must be positive.
    * @param {Color} color
    * @param {number} specular - Must be positive.
    * @param {number} reflective - Must be between 0 and 1.
    */
    constructor(position, radius, color, specular = 0, reflective = 0) {
        super(position)

        this.radius = radius
        this.color = color
        this.specular = specular
        this.reflective = reflective
    }

    get radius() { return this.#radius }
    /** @param {number} radius - Must be positive. */
    set radius(radius) {
        if (typeof radius !== 'number') throw new TypeError("Parameter 'radius' is not number")
        if (radius <= 0) throw new RangeError("Parameter 'radius' is not positive")
        this.#radius = radius
    }

    get color() { return this.#color }
    set color(color) {
        if (!(color instanceof Color)) throw new TypeError("Parameter 'color' is not Color")
        this.#color = color
    }

    get specular() { return this.#specular }
    /** @param {number} specular - Must be positive. */
    set specular(specular) {
        if (typeof specular !== 'number') throw new TypeError("Parameter 'specular' is not number")
        if (specular < 0) throw new RangeError("Parameter 'specular' is negative")

        this.#specular = specular
    }

    get reflective() { return this.#reflective }
    /** @param {number} reflective - Must be between 0 and 1. */
    set reflective(reflective) {
        if (typeof reflective !== 'number') throw new TypeError("Parameter 'reflective' is not number")
        if (reflective < 0 || reflective > 1) throw new RangeError("Parameter 'specular' is not between 0 and 1")

        this.#reflective = reflective
    }

    toJSON() {
        return {
            ...super.toJSON(),
            Radius: this.radius,
            Specular: this.specular,
            Reflective: this.reflective,
            Color: this.color.toJSON()
        }
    }
}
