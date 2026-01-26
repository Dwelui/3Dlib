import Vector3 from "../math/Vector3.js";
import Light from "./Light.js"

export default class DirectionalLight extends Light {

    /**
    * @param {Object} args
    * @param {Vector3} args.direction
    * @param {number} args.intensity - Must be between 0 and 1.
    */
    constructor({direction, intensity}) {
        super({position: direction, intensity})
    }

    set direction(direction) { this.position = direction }
    get direction() { return this.position }
}
