import Vector3 from "../math/Vector3.js";
import Vector4 from "../math/Vector4.js";

export default class Vertex {
    /** @type {Vector3} */ #position

    /**
    * @param {Vector3} [position]
    */
    constructor(position) {
        this.#position = position ?? new Vector3()
    }

    set position(v3) { this.#position = v3.clone() }
    get position() { return this.#position.clone() }
    get positionVector4() { return new Vector4([...this.#position, 1]) }

    clone() { return new Vertex(this.#position.clone()) }
}
