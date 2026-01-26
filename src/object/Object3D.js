import { assertInstances } from "../Assert.js";
import Vector3 from "../math/Vector3.js";

export default class Object3D {
    /** @private @type{Vector3} */ #position

    /**
    * @param {Object} args
    * @param {Vector3} args.position
    */
    constructor({position}) {
        this.position = position
    }

    get position() { return this.#position }
    set position(position) { assertInstances({position}, Vector3); this.#position = position }

    toJSON() {
        return {
            Position: this.position.toJSON()
        }
    }
}
