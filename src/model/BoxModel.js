import Vector3 from "../math/Vector3.js";
import Model from "../render/Model.js";
import Triangle from "../render/Triangle.js";
import Vertex from "../render/Vertex.js";

export default class BoxModel extends Model {
    /** @type {number} */ #width
    /** @type {number} */ #height
    /** @type {number} */ #length

    /**
    * @param {Object} args
    * @param {number} [args.width] Defaults to 1.
    * @param {number} [args.height] Defaults to 1.
    * @param {number} [args.length] Defaults to 1.
    */
    constructor({ width = 1, height = 1, length = 1 } = {}) {
        const halfWidth = width / 2
        const halfHeight = height / 2
        const halfLength = length / 2

        super([
            // front
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength))
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength))
            ),
            // right
            new Triangle(
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength))
            ),
            new Triangle(
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength))
            ),
            // back
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength))
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength))
            ),
            // left
            new Triangle(
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength))
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength))
            ),
            // top
            new Triangle(
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength))
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength))
            ),
            // bottom
            new Triangle(
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength))
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength))
            ),
        ])

        this.#width = width
        this.#height = height
        this.#length = length
    }
}
