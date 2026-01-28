import { assertNumbersBetween } from "../Assert.js"
import Vector3 from "../math/Vector3.js"
import Object3D from "./Object3D.js"

export default class Light extends Object3D {
    /** @type{number} */ #intensity

    /**
    * @param {Object} args
    * @param {Vector3} args.position
    * @param {number} args.intensity - Must be between 0 and 1.
    */
    constructor({position, intensity}) {
        super({ position })

        this.intensity = intensity
    }

    get intensity() { return this.#intensity }
    set intensity(intensity) { assertNumbersBetween({intensity}, 0, 1); this.#intensity = intensity }
}
