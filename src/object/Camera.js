import Viewport from "../Viewport.js";

export default class Camera {
    /** @type {Viewport} */ #viewport

    /**
    * @param {Object} args
    * @param {Viewport} args.viewport
    */
    constructor({ viewport }) {
        this.#viewport = viewport
    }

    set viewport(viewport) { this.#viewport = viewport }
    /** @returns {Viewport} Returns a reference. */
    get viewport() { return this.#viewport }
}
