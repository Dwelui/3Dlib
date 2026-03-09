import Canvas from "../Canvas.js"
import Matrix4 from "../math/Matrix4.js"
import RendererUtils from "../math/RendererUtils.js"
import Vector2 from "../math/Vector2.js"
import Camera from "../object/Camera.js"
import Triangle from "./Triangle.js"
import Instance from "./Instance.js"
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

    /** @param {Instance} instance */
    renderInstance(instance) {
        // TODO: flatten triangles into indecies and verticies and cache them in Model.
        // apply model and camera transformation matricies to flattened verticies.
        // find simial verticies and merge them, reroute indicies
        for (const triangle of instance.model.triangles) {
            this.renderTriangle(triangle)
        }
    }

    /** @param {Triangle} triangle */
    renderTriangle(triangle) {
        const projectionMatrix = RendererUtils.calculateProjectionAndMappingMatrix(
            this.#canvas.width,
            this.#canvas.height,
            this.#camera.viewport.width,
            this.#camera.viewport.height,
            this.#camera.viewport.distanceToCamera
        )

        // TODO:
        // 1. apply camera transform matrix;
        // 2. apply projection matrix - check;
        // 3. project vertex to 2d - check.

        const projectedVerticies = []
        for (const vertex of triangle.verticies) {
            projectedVerticies.push(Canvas2DRenderer.projectVertex(vertex, projectionMatrix))
        }

        this.#canvas.drawWireframeTriangle(
            projectedVerticies[0],
            projectedVerticies[1],
            projectedVerticies[2],
            triangle.color
        )
    }

    /**
     * @param {Vertex} vertex
     * @param {Matrix4} projectionMatrix
     *
     * @returns {Vector2}
     */
    static projectVertex(vertex, projectionMatrix) {
        const projectedVertexPosition = vertex.positionVector4.multiplyMatrix(projectionMatrix)
        const z = projectedVertexPosition.z

        return new Vector2(
            projectedVertexPosition.x / z,
            projectedVertexPosition.y / z,
        ).floor();
    }
}
