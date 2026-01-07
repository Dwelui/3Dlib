import Object from "./Object.js"

export default class Sphere extends Object {
    /** @private @type{number} */ #radius

    constructor(position, radius) {
        super(position)

        this.radius = radius
    }

    get radius() {
        return this.#radius
    }

    set radius(radius) {
        if (typeof radius !== 'number') {
            throw new TypeError("Parameter 'radius' is not number")
        }

        this.#radius = radius
    }
}
