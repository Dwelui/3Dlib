import Vector3 from "../math/Vector3.js"
import Light from "./Light.js"

export default class AmbientLight extends Light {

    /**
    * @param {number} intensity - Must be between 0 and 1.
    */
    constructor(intensity) {
        super(new Vector3(), intensity)
    }
}
