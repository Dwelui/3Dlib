import Color from "../Color.js";
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

        // TODO: Tiddy up triangle vertices order
        super([
            // front
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength)),
                new Color(255, 0, 0)
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Color(255, 0, 0)
            ),
            // left
            new Triangle(
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Color(0, 255, 0)
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength)),
                new Color(0, 255, 0)
            ),
            // back
            new Triangle(
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength)),
                new Color(0, 0, 255)
            ),
            new Triangle(
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength)),
                new Color(0, 0, 255)
            ),
            // right
            new Triangle(
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Color(128, 128, 0)
            ),
            new Triangle(
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength)),
                new Color(128, 128, 0)
            ),
            // top
            new Triangle(
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Color(128, 0, 128)
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, halfHeight, -halfLength)),
                new Color(128, 0, 128)
            ),
            // bottom
            new Triangle(
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, -halfLength)),
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength)),
                new Color(0, 128, 128)
            ),
            new Triangle(
                new Vertex(new Vector3(-halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, halfLength)),
                new Vertex(new Vector3(halfWidth, -halfHeight, -halfLength)),
                new Color(0, 128, 128)
            ),
        ])

        this.#width = width
        this.#height = height
        this.#length = length
    }
}
