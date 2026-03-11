import Triangle from "./Triangle.js";
import Vertex from "./Vertex.js";

export default class Model {
    /** @type {Triangle[]} */ #triangles
    /** @type {Vertex[]} */ #vertices
    /** @type {number[]} */ #indices

    /**
    * @param {Triangle[]} triangles
    */
    constructor(triangles) {
        this.#triangles = triangles
        this.#vertices = triangles.flatMap(t => t.verticies.map(v => v.clone()))
        this.#indices = [...Array(this.vertices.length).keys()]
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

    get vertices() { return this.#vertices }
    get indices() { return this.#indices }
}
