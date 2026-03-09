import Triangle from "./Triangle.js";

export default class Model {
    /** @type {Triangle[]} */ #triangles

    /**
    * @param {Triangle[]} triangles 
    */
    constructor(triangles) {
        this.#triangles = triangles
    }

    get triangles() { return this.#triangles.map(t => t.clone()) }

    /** @param {Triangle} triangle */
    add(triangle) {
        this.#triangles.push(triangle)

        return this
    }

    clone() {
        return new Model(
            this.#triangles
        )
    }
}
