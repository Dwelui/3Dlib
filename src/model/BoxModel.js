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
    constructor({ width, height, length } = {}) {
        // INFO: This is in world coordinates
        super([
            // front
            new Triangle(
                new Vertex(new Vector3(-1, 1, 5)),
                new Vertex(new Vector3(1, -1, 5)),
                new Vertex(new Vector3(-1, -1, 5))
            ),
            new Triangle(
                new Vertex(new Vector3(-1, 1, 5)),
                new Vertex(new Vector3(1, 1, 5)),
                new Vertex(new Vector3(1, -1, 5))
            ),
            // right
            new Triangle(
                new Vertex(new Vector3(1, -1, 5)),
                new Vertex(new Vector3(1, 1, 5)),
                new Vertex(new Vector3(1, 1, 6))
            ),
            new Triangle(
                new Vertex(new Vector3(1, 1, 6)),
                new Vertex(new Vector3(1, -1, 6)),
                new Vertex(new Vector3(1, -1, 5))
            ),
            // back
            new Triangle(
                new Vertex(new Vector3(-1, 1, 6)),
                new Vertex(new Vector3(1, -1, 6)),
                new Vertex(new Vector3(-1, -1, 6))
            ),
            new Triangle(
                new Vertex(new Vector3(-1, 1, 6)),
                new Vertex(new Vector3(1, 1, 6)),
                new Vertex(new Vector3(1, -1, 6))
            ),
            // left
            new Triangle(
                new Vertex(new Vector3(-1, -1, 5)),
                new Vertex(new Vector3(-1, 1, 5)),
                new Vertex(new Vector3(-1, 1, 6))
            ),
            new Triangle(
                new Vertex(new Vector3(-1, 1, 6)),
                new Vertex(new Vector3(-1, -1, 6)),
                new Vertex(new Vector3(-1, -1, 5))
            ),
            // top
            new Triangle(
                new Vertex(new Vector3(1, 1, 5)),
                new Vertex(new Vector3(-1, 1, 5)),
                new Vertex(new Vector3(-1, 1, 6))
            ),
            new Triangle(
                new Vertex(new Vector3(-1, 1, 6)),
                new Vertex(new Vector3(1, 1, 6)),
                new Vertex(new Vector3(1, 1, 5))
            ),
            // bottom
            new Triangle(
                new Vertex(new Vector3(1, -1, 5)),
                new Vertex(new Vector3(-1, -1, 5)),
                new Vertex(new Vector3(-1, -1, 6))
            ),
            new Triangle(
                new Vertex(new Vector3(-1, -1, 6)),
                new Vertex(new Vector3(1, -1, 6)),
                new Vertex(new Vector3(1, -1, 5))
            ),
        ])

        this.#width = width ?? 1
        this.#height = height ?? 1
        this.#length = length ?? 1
    }
}
