import Color from "./math/Color.js"

/**
* @typedef {Object} CanvasOptions
* @property {number} width  - Canvas width in pixels
* @property {number} height - Canvas height in pixels
*/

export default class Canvas {
    #COLOR_BACKGROUND = '#000000'

    /** @private @type{HTMLCanvasElement} */ #canvas
    /** @private @type{CanvasRenderingContext2D} */ #context
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

        this.#context = this.#canvas.getContext('2d')
        if (this.#canvas === null) {
            throw new Error("Context not found")
        }

        if (typeof options !== 'object') {
            throw new TypeError("Parameter 'options' is not object")
        }
        this.width = options.width
        this.height = options.height
    }

    get width() { return this.#options.width }

    /** @param {number} pixels - Must be positive */
    set width(pixels) {
        this.#validateDimension(pixels)

        this.#options.width = pixels
        this.#canvas.width = pixels
    }

    get height() { return this.#options.height }

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

    /**
    * @param {number} x
    * @param {number} y
    * @param {Color} color
    */
    putPixel(x, y, color) {
        if (typeof x !== 'number') {
            throw new TypeError("Parameter 'x' is not number")
        }

        if (typeof y !== 'number') {
            throw new TypeError("Parameter 'y' is not number")
        }

        if (!(color instanceof Color)) {
            throw new TypeError("Parameter 'color' is not Color")
        }

        x += this.width / 2
        y = this.height / 2 - y

        this.#context.fillStyle = color.hex;
        this.#context.fillRect(x, y - 1, 1, 1)
    }

    clear() {
        this.#context.fillStyle = this.#COLOR_BACKGROUND
        this.#context.fillRect(0, 0, this.width, this.height)
    }
}
