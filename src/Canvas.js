/**
* @typedef {Object} CanvasOptions
* @property {number} width  - Canvas width in pixels
* @property {number} height - Canvas height in pixels
*/

export default class Canvas {
    /** @private @type{HTMLCanvasElement} */ #canvas
    /** @private @type{CanvasOptions} */ #options = {}

    /**
    * @param {string} querySelector - Query selector to find canvas element by. Throws error if not found.
    * @param {CanvasOptions} options
    */
    constructor(querySelector, options) {
        if (typeof querySelector !== 'string') {
            throw new TypeError("Parameter 'querySelector' is not string")
        }

        this.#canvas = document.querySelector(querySelector)
        if (this.#canvas === null) {
            throw new Error("Canvas element not found")
        }

        if (typeof options !== 'object') {
            throw new TypeError("Parameter 'options' is not object")
        }
        this.width = options.width
        this.height = options.height
    }

    /** @param {number} pixels - Must be positive */
    set width(pixels) {
        this.#validateDimension(pixels)

        this.#options.width = pixels
        this.#canvas.width = pixels
    }

    /** @param {number} pixels - Must be positive */
    set height(pixels) {
        this.#validateDimension(pixels)

        this.#options.height = pixels
        this.#canvas.height = pixels
    }

    #validateDimension(pixels) {
        if (typeof pixels !== 'number') {
            throw new TypeError("Parameter 'pixels' is not number")
        }

        if (pixels <= 0) {
            throw new RangeError("Parameter 'pixels' is negative or zero")
        }
    }
}
