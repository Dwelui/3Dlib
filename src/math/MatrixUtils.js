import Matrix3 from "./Matrix3.js";
import Vector3 from "./Vector3.js";

export default class MatrixUtils {
    /**
    * @param {Vector3} rotationVector3
    *
    * @returns {Matrix3}
    */
    static calculateRotationMatrix(rotationVector3) {
        const x = rotationVector3.x
        const y = -rotationVector3.y
        const z = rotationVector3.z

        const xRotationMatrix = new Matrix3([
            1, 0, 0,
            0, Math.cos(x), -Math.sin(x),
            0, Math.sin(x), Math.cos(x)
        ])

        const yRotationMatrix = new Matrix3([
            Math.cos(y), 0, Math.sin(y),
            0, 1, 0,
            -Math.sin(y), 0, Math.cos(y),
        ])

        const zRotationMatrix = new Matrix3([
            Math.cos(z), -Math.sin(z), 0,
            Math.sin(z), Math.cos(z), 0,
            0, 0, 1,
        ])

        return xRotationMatrix.multiplyMatrix(yRotationMatrix).multiplyMatrix(zRotationMatrix)
    }
}
