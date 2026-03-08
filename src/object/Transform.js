import Vector3 from "../math/Vector3.js";
import RendererUtils from "../math/RendererUtils.js";
import MatrixUtils from "../math/MatrixUtils.js";

// TODO: Cache rotation and model matricies.
export default class Transform {
    /** @type {Vector3} */ #position
    /** @type {Vector3} */ #rotation
    /** @type {number} */ #scale

    /**
    * @param {Vector3} [position]
    * @param {Vector3} [rotation]
    * @param {number} [scale]
    */
    constructor(position, rotation, scale) {
        this.#position = position ? position.clone() : new Vector3()
        this.#rotation = rotation ? rotation.clone() : new Vector3()
        this.#scale = scale ?? 1
    }

    get position() { return this.#position.clone() }
    /** @param {Vector3} v3 */
    set position(v3) { this.#position = v3.clone() }

    get rotation() { return this.#rotation.clone() }
    /** @param {Vector3} v3 */
    set rotation(v3) { this.#rotation = v3.clone() }

    get rotationMatrix() {
        return MatrixUtils.calculateRotationMatrix(this.#rotation)
    }

    get scale() { return this.#scale }
    /** @param {number} scalar */
    set scale(scalar) { this.#scale = scalar }

    get modelMatrix() {
        return RendererUtils.calculateModelMatrix(this)
    }
}
