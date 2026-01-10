/**
* @typedef {Object} ViewportOptions
* @property {number} width  - Viewport width in units
* @property {number} height - Viewport height in units
*/

import Canvas from "./Canvas.js"
import Vector3 from "./math/Vector3.js"

export default class Viewport
{
    /** @private @type{ViewportOptions} */ #options = {}
    /** @private @type{number} */ #distanceToCamera

    /**
    * @param {ViewportOptions} options
    * @param {number} distanceToCamera
    */
    constructor(options, distanceToCamera) {
        if (typeof options !== 'object') throw new TypeError("Parameter 'options' is not object")
        this.width = options.width
        this.height = options.height

        this.distanceToCamera = distanceToCamera
    }

    get width() { return this.#options.width }

    /** @param {number} units - Must be positive */
    set width(units) {
        this.#validateDimension(units)

        this.#options.width = units
    }

    get height() { return this.#options.height }

    /** @param {number} units - Must be positive */
    set height(units) {
        this.#validateDimension(units)

        this.#options.height = units
    }

    get distanceToCamera() {
        return this.#distanceToCamera
    }

    /** @param {number} units - Must be positive */
    set distanceToCamera(units) {
        if (typeof units !== 'number') throw new TypeError("Parameter 'distanceToCamera' is not number")
        if (units <= 0) throw new RangeError("Parameter 'distanceToCamera' is not positive")

        this.#distanceToCamera = units
    }

    #validateDimension(units) {
        if (typeof units !== 'number') throw new TypeError("Parameter 'units' is not number")
        if (units <= 0) throw new RangeError("Parameter 'units' is negative or zero")
    }

    /**
    * @param {number} x
    * @param {number} y
    * @param {Canvas} canvas
    */
    fromCanvas(x, y, canvas) {
        if (typeof x !== 'number') throw new TypeError("Parameter 'x' is not number")
        if (typeof y !== 'number') throw new TypeError("Parameter 'y' is not number")
        if (!(canvas instanceof Canvas)) throw new TypeError("Parameter 'canvas' is not Canvas")

        return new Vector3(x * this.width / canvas.width, y * this.height / canvas.height, this.distanceToCamera)
    }
}
