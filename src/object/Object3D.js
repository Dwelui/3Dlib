import { assertInstances } from "../Assert.js";
import Matrix3 from "../math/Matrix3.js";
import Vector3 from "../math/Vector3.js";

export default class Object3D {
    /** @private @type{Vector3} */ #position
    /** @private @type{Matrix3} */ #rotation

    /**
    * @param {Object} args
    * @param {Vector3} args.position
    * @param {Matrix3} [args.rotation]
    */
    constructor({ position, rotation }) {
        this.position = position
        this.rotation = rotation ?? new Matrix3()
    }

    get position() { return this.#position }
    set position(position) { assertInstances({ position }, Vector3); this.#position = position }

    get rotation() { return this.#rotation }
    set rotation(rotation) { assertInstances({ rotation }, Matrix3); this.#rotation = rotation }

    toJSON() {
        return {
            Position: this.position.toJSON(),
            Rotation: this.rotation.toJSON()
        }
    }
}
