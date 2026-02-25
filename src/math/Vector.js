export default class Vector {
    /** @type {number[]} */ #components = []

    /** @param {number[]} components */
    constructor(components) {
        this.#components = components
    }

    get components() { return this.#components }

    get length() { return this.#components.length }
}
