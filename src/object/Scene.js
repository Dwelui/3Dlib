import { assertInstancesMapped, assertInstancesNullable } from "../Assert.js"
import Vector3 from "../math/Vector3.js"
import Object3D from "./Object3D.js"

export default class Scene extends Object3D {
    /** @private @type{Array<Object3D>} */ #objects = []

    /**
    * @param {Object} [args]
    * @param {?Vector3} args.position
    */
    constructor({position = null} = {}) {
        assertInstancesNullable({position}, Vector3)

        super({position: position ?? new Vector3()})
    }

    get objects() { return this.#objects }

    /** @param {Object3D} object3D */
    add(object3D) { assertInstancesMapped({object3D}); this.#objects.push(object3D) }

    toJSON() {
        return {
            Objects3D: this.#objects.map(object => object.toJSON())
        }
    }
}
