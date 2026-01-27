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
        this.rotation = rotation ?? Matrix3.identity()
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

    /**
    * @param {number} angle - In degress.
    */
    rotateX(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        this.rotation.multiplyMatrix3(new Matrix3([
            cos, -1 * sin, 0,
            sin, cos, 0,
            0, 0, 0
        ]))
    }
}
