import { assertArrays, assertNumberBetween, assertNumbers } from "../Assert.js"
import Vector3 from "./Vector3.js"

export default class Matrix3 {
    /** @private @type{Array<number>} */ #components

    /**
    * @param {Array<number> | Array<Vector3>} [components]
    */
    constructor(components) {
        if (
            Array.isArray(components) &&
            components.length === 9 &&
            components.every(c => typeof c === 'number')
        ) {
            this.components = components
        } else if (
            Array.isArray(components) &&
            components.length === 3 &&
            components.every(c => c instanceof Vector3)
        ) {
            this.components = components.flatMap(component => component.toArray())
        } else if (typeof components === 'undefined') {
            this.components = Matrix3.zero()
        } else {
            throw TypeError("Invalid 'components' format")
        }
    }

    /**
    * @param {number} index - Number between 0 and 8.
    */
    get(index) { assertNumberBetween({ index }, 0, 8); return this.components[index] }

    /**
    * @param {number} index - Number between 0 and 8.
    * @param {number} value
    */
    set(index, value) {
        assertNumberBetween({ index }, 0, 8)
        assertNumbers({ value })

        this.components[index] = value
    }

    get components() { return this.#components }
    set components(components) { assertArrays({ components }); this.#components = components }

    toJSON() {
        return {
            1: this.get(0),
            2: this.get(1),
            3: this.get(2),
            4: this.get(3),
            5: this.get(4),
            6: this.get(5),
            7: this.get(6),
            8: this.get(7),
            9: this.get(8),
        }
    }

    static zero() {
        return [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ]
    }
}
