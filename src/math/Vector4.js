import Matrix4 from "./Matrix4.js"
import Vector3 from "./Vector3.js"

export default class Vector4 {
    /** @type{number} */ x
    /** @type{number} */ y
    /** @type{number} */ z
    /** @type{number} */ w

    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    clone() { return new Vector4(this.x, this.y, this.z, this.w) }

    /**
     * @param {Vector3} v3
     */
    static fromVertex3(v3) {
        return new Vector4(...v3.toArray(), 1)
    }

    /** @param {number} number */
    divideScalar(number) {
        this.x /= number
        this.y /= number
        this.z /= number
        this.w /= number

        return this
    }

    /** @param {Matrix4} m4 */
    multiplyMatrix4(m4) {
        const m4Components = m4.toArray()

        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        this.x = m4Components[0] * x + m4Components[1] * x + m4Components[2] * x + m4Components[3] * x
        this.y = m4Components[4] * y + m4Components[5] * y + m4Components[6] * y + m4Components[7] * y
        this.z = m4Components[8] * z + m4Components[9] * z + m4Components[10] * z + m4Components[11] * z
        this.w = m4Components[12] * w + m4Components[13] * w + m4Components[14] * w + m4Components[15] * w

        return this
    }
}
