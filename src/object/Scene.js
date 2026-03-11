import Instance from "../render/Instance.js";

export default class Scene {
    /** @type {Instance[]} */ #instances

    /**
    * @param {Object} param0
    * @param {Instance[]} [param0.instances]
    */
    constructor({ instances = [] } = {}) {
        this.#instances = instances
    }

    get instances() { return this.#instances }
}
