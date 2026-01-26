import { assertNumbersBetween } from "../Assert.js"
import Object3D from "./Object3D.js"

export default class Light extends Object3D {
    /** @private @type{number} */ #intensity

    /**
    * @param {Vector3} position
    * @param {number} intensity - Must be between 0 and 1.
    */
    constructor(position, intensity) {
        super({position})

        this.intensity = intensity
    }

    get intensity() { return this.#intensity }
    set intensity(intensity) { assertNumbersBetween({intensity}, 0, 1); this.#intensity = intensity }
}
