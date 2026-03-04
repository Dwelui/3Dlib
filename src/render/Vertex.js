import Vector4 from "../math/Vector4.js";

export default class Vertex {
    /** @type {Vector4} */ #position

    /**
    * @param {Vector4} [position]
    */
    constructor(position) {
        this.#position = position ?? new Vector4()
    }

    get position() { return this.#position.clone() }

    clone() {
        return new Vertex(this.#position.clone())
    }
}
