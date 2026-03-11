import Transform from "../render/Transform.js";
import Viewport from "../Viewport.js";

export default class Camera {
    /** @type {Viewport} */ #viewport
    /** @type {Transform} */ #transform

    /**
    * @param {Object} args
    * @param {Viewport} args.viewport
    * @param {Transform} [args.transform]
    */
    constructor({ viewport, transform }) {
        this.#viewport = viewport
        this.#transform = transform ?? new Transform()
    }

    set viewport(viewport) { this.#viewport = viewport }
    get viewport() { return this.#viewport }

    set transform(transform) { this.#transform = transform.clone() }
    get transform() { return this.#transform.clone() }
}
