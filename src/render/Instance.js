import Transform from "../object/Transform.js";
import Model from "./Model.js";

export default class Instance {
    /** @type {Model} */ #model
    /** @type {Transform} */ #transform

    /**
    * @param {Model} model
    * @param {Transform} transform
    */
    constructor(model, transform) {
        this.#model = model.clone()
        this.#transform = transform.clone()
    }

    get model() { return this.#model.clone() }
    set model(model) { this.#model = model.clone() }

    get transform() { return this.#transform.clone() }
    set transform(transform) { this.#transform = transform.clone() }
}
