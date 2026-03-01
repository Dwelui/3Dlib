import Vector3 from "../math/Vector3.js"
import Object3D from "./Object3D.js"

export default class Scene extends Object3D {
    /** @type{Array<Object3D>} */ #objects = []

    /**
    * @param {Object} [args]
    * @param {Vector3} [args.position]
    */
    constructor({ position } = {}) {
        position = position ?? new Vector3()

        super({ position })
    }

    get objects() { return this.#objects }

    /**
    * @overload
    * @param {Object3D} object
    * @return Scene
    *
    * @overload
    * @param {Array<Object3D>} objects
    * @return Scene
    *
    * @param {Array<Object3D>|Object3D} args
    */
    add(args) {
        if (Array.isArray(args)) {
            for (const object of args) {
                this.#objects.push(object)
            }
        }

        if (args instanceof Object3D) {
            this.#objects.push(args)
        }

        return this
    }
}
