import Matrix3 from "../math/Matrix3.js";
import Vector3 from "../math/Vector3.js";
import Object3D from "./Object3D.js";

export default class Box extends Object3D {
    /** @type {string} */ type = "Box"

    /** @type {number} */ width
    /** @type {number} */ height
    /** @type {number} */ length

    /**
    * @param {Object} args
    * @param {number} [args.width]
    * @param {number} [args.height]
    * @param {number} [args.length]
    * @param {Vector3} [args.position]
    * @param {Matrix3} [args.rotation]
    */
    constructor({ width = 1, height = 1, length = 1, position, rotation } = {}) {
        super({ position, rotation })
        this.width = width
        this.height = height
        this.length = length
    }
}
