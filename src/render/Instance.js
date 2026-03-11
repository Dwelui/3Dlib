import Transform from "./Transform.js";
import Model from "./Model.js";
import RendererUtils from "../math/RendererUtils.js";

export default class Instance {
    /** @type {Model} */ #model
    /** @type {Transform} */ #transform

    /**
    * @param {Object} args
    * @param {Model} args.model
    * @param {Transform} [args.transform]
    */
    constructor({ model, transform }) {
        this.#model = model
        this.#transform = transform ?? new Transform()
    }

    get model() { return this.#model }
    set model(model) { this.#model = model }

    get transform() { return this.#transform }
    set transform(transform) { this.#transform = transform }

    get modelMatrix() { return RendererUtils.calculateModelMatrix(this.#transform) }
}
