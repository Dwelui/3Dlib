import Transform from "../render/Transform.js";
import Viewport from "../Viewport.js";

export default class Camera {
    /** @type {Viewport} */ #viewport
    /** @type {Transform} */ #transform

    /**
    * @param {Object} args
    * @param {Viewport} args.viewport
    * @param {Transform} args.transform
    */
    constructor({ viewport, transform }) {
        this.#viewport = viewport
        this.#transform = transform
    }

    set viewport(viewport) { this.#viewport = viewport }
    /** @returns {Viewport} Returns a reference. */
    get viewport() { return this.#viewport }

    set transform(transform) { this.#transform = transform }
    get transform() { return this.#transform }
}
