import Matrix4 from "../math/Matrix4.js";
import Vector3 from "../math/Vector3.js";
import Vector4 from "../math/Vector4.js";

export default class Vertex {
    /** @type {Vector3} */ #position

    /**
    * @param {Vector3} [position]
    */
    constructor(position) {
        this.#position = position ?? new Vector3()
    }

    set position(v3) { this.#position = v3.clone() }
    get position() { return this.#position.clone() }

    clone() { return new Vertex(this.#position.clone()) }

    /** @param {Matrix4} m4 */
    applyTransformMatrix(m4) {
        const homogeneousPosition = new Vector4([...this.#position, 1])
        homogeneousPosition.multiplyMatrix(m4)
        if (homogeneousPosition.w !== 1 && homogeneousPosition.w !== 0)
            homogeneousPosition.divideScalar(homogeneousPosition.w)

        this.#position[0] = homogeneousPosition[0]
        this.#position[1] = homogeneousPosition[1]
        this.#position[2] = homogeneousPosition[2]

        return this
    }
}
