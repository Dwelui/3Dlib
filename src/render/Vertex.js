import Vector3 from "../math/Vector3.js";
import Vector4 from "../math/Vector4.js";

export default class Vertex {
    /** @type {Vector4} */ #position

    /**
    * @param {Vector3} [position]
    */
    constructor(position) {
        if (position instanceof Vector3)
            this.#position = new Vector4(...position, 1)
        else
            this.#position = new Vector4()
    }

    set position(v3) { this.#position = new Vector4([...v3, 1]) }
    get position() { return new Vector3(this.#position) }
    get positionV4() { return this.#position.clone() }

    clone() {
        return new Vertex(this.#position.clone())
    }
}
