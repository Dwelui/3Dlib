import Color from "../Color.js";
import Vertex from "../render/Vertex.js";

export default class Triangle {
    /** @type {Array<Vertex>} */ #vertices = new Array(3)
    /** @type {Color} */ #color

    /**
    * @param {Vertex} v1
    * @param {Vertex} v2
    * @param {Vertex} v3
    * @param {Color} [color]
    */
    constructor(v1, v2, v3, color) {
        this.#vertices[0] = v1.clone()
        this.#vertices[1] = v2.clone()
        this.#vertices[2] = v3.clone()
        this.#color = color?.clone() ?? new Color()
    }

    set v1(vertex) { this.#vertices[0] = vertex.clone() }
    get v1() { return this.#vertices[0].clone() }
    set v2(vertex) { this.#vertices[1] = vertex.clone() }
    get v2() { return this.#vertices[1].clone() }
    set v3(vertex) { this.#vertices[2] = vertex.clone() }
    get v3() { return this.#vertices[2].clone() }
    get verticies() { return this.#vertices.map((v) => v.clone()) }

    set color(color) { this.#color = color.clone() }
    get color() { return this.#color.clone() }

    clone() {
        return new Triangle(
            this.#vertices[0].clone(),
            this.#vertices[1].clone(),
            this.#vertices[2].clone(),
            this.#color.clone()
        )
    }
}
