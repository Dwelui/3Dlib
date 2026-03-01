import Matrix3 from "../math/Matrix3.js";
import Matrix4 from "../math/Matrix4.js";
import Vector3 from "../math/Vector3.js";
import RendererUtils from "../math/RendererUtils.js";

export default class Transform {
    /** @type {Vector3} */ #position
    /** @type {Matrix3} */ #rotation
    /** @type {number} */ #scale

    /** @type {Matrix4|null} */ #matrixCache
    /** @type {boolean} */ #isDirty

    /**
    * @param {Vector3} position
    * @param {Matrix3} rotation
    * @param {number} scale
    */
    constructor(position, rotation, scale) {
        this.#position = position.clone()
        this.#rotation = rotation.clone()
        this.#scale = scale

        this.#matrixCache = null
        this.#isDirty = true
    }

    get position() { return this.#position.clone() }
    /** @param {Vector3} v3 */
    set position(v3) {
        this.#isDirty = true
        this.#position = v3.clone()
    }

    get rotation() { return this.#rotation.clone() }
    /** @param {Matrix3} m3 */
    set rotation(m3) {
        this.#isDirty = true
        this.#rotation.clone() = m3
    }

    get scale() { return this.#scale }
    /** @param {number} scalar */
    set scale(scalar) {
        this.#isDirty = true
        this.#scale = scalar
    }

    /** @returns {Matrix4} Returns a reference. */
    get modelMatrix() {
        if (this.#isDirty === true || this.#matrixCache === null) {
            this.#matrixCache = RendererUtils.calculateModelMatrix(this)
            this.#isDirty = false
        }

        return this.#matrixCache
    }
}
