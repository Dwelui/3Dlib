import Vector3 from "../math/Vector3.js";

export default class Vertex {
    /** @type {Vector3} */ position

    /**
    * @param {Vector3} position
    */
    constructor(position) {
        this.position = position
    }
}
