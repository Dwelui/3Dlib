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
}
