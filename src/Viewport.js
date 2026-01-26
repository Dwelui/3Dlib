/**
* @typedef {Object} ViewportOptions
* @property {number} width  - Viewport width in units
* @property {number} height - Viewport height in units
*/

import { assertInstancesMapped, assertNumbers, assertObjects, assertPositiveNumbers } from "./Assert.js"
import Canvas from "./Canvas.js"
import Vector3 from "./math/Vector3.js"

export default class Viewport {
    /** @private @type{ViewportOptions} */ #options = {}
    /** @private @type{number} */ #distanceToCamera

    /**
    * @param {ViewportOptions} options
    * @param {number} distanceToCamera
    */
    constructor(options, distanceToCamera) {
        assertObjects({ options })

        this.width = options.width
        this.height = options.height

        this.distanceToCamera = distanceToCamera
    }

    get width() { return this.#options.width }
    /** @param {number} units - Must be positive */
    set width(units) { assertPositiveNumbers({ units }); this.#options.width = units }

    get height() { return this.#options.height }
    /** @param {number} units - Must be positive */
    set height(units) { assertPositiveNumbers({ units }); this.#options.height = units }

    get distanceToCamera() { return this.#distanceToCamera }
    /** @param {number} units - Must be positive */
    set distanceToCamera(units) { assertPositiveNumbers({units}); this.#distanceToCamera = units }

    /**
    * @param {number} x
    * @param {number} y
    * @param {Canvas} canvas
    */
    fromCanvas(x, y, canvas) {
        assertNumbers({x, y})
        assertInstancesMapped({canvas})

        return new Vector3(x * this.width / canvas.width, y * this.height / canvas.height, this.distanceToCamera)
    }
}
