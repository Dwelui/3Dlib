import Canvas from "../Canvas.js"
import Matrix4 from "../math/Matrix4.js"
import RendererUtils from "../math/RendererUtils.js"
import Vector2 from "../math/Vector2.js"
import Camera from "../object/Camera.js"
import Triangle from "../object/Triangle.js"
import Vertex from "./Vertex.js"

/**
 * @typedef {import('./renderer.interface.js').default} RendererInterface
 *
 * @implements {RendererInterface}
 */
export default class Canvas2DRenderer {
    /** @type {Canvas} */ #canvas
    /** @type {Camera} */ #camera

    /**
    * @param {Object} args
    * @param {Canvas} args.canvas
    * @param {Camera} args.camera
    */
    constructor({ canvas, camera }) {
        this.#canvas = canvas
        this.#camera = camera
    }

    renderScene(scene) {

    }

    /**
    * @param {Triangle} triangle
    *
    * @returns {void}
    */
    renderTriangle(triangle) {
        const projectionMatrix = RendererUtils.calculateProjectionAndMappingMatrix(
            this.#canvas.width,
            this.#canvas.height,
            viewport.width,
            viewport.height,
            viewport.height
        )

        // TODO:
        // 1. apply camera transform matrix;
        // 2. apply projection matrix;
        // 3. project vertex to 2d.

        const projectedVertices = Array(3)
        for (const vertex of triangle.verticies) {

        }

        this.#canvas.drawWireframeTriangle(
            projectedVertices[triangle.vertices[0]],
            projectedVertices[triangle.vertices[1]],
            projectedVertices[triangle.vertices[2]],
            triangle.color
        )
    }

    /**
     * @param {Vertex} vertex
     * @param {Matrix4} matrix
     *
     * @returns {Vector2}
     */
    static projectVertex(vertex, matrix) {
        const projectedVertexPosition = vertex.positionVector4.multiplyMatrix(matrix)
        const z = projectedVertexPosition.z

        return new Vector2(
            projectedVertexPosition.x / z,
            projectedVertexPosition.y / z,
        ).floor();
    }
}
