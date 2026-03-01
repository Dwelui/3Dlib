import Canvas from "../Canvas.js"
import Matrix3 from "../math/Matrix3.js"
import Matrix4 from "../math/Matrix4.js"
import Vector2 from "../math/Vector2.js"
import Vector4 from "../math/Vector4.js"
import Camera from "../object/Camera.js"
import Object3D from "../object/Object3D.js"
import Viewport from "../Viewport.js"
import Triangle from "./Triangle.js"
import Vertex from "./Vertex.js"

/**
 * @typedef {import('./RendererInterface.js').default} RendererInterface
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

    /**
    * @param {Object3D} object
    * @param {Matrix4} cameraMatrix
    * @param {Matrix4} projectionMatrix - 3D to canvas matrix
    */
    renderObject(object, cameraMatrix, projectionMatrix) {
        const mesh = object.mesh
        if (!mesh) return

        /** @type {Array<Vector2>} */
        const projectedVertices = []
        for (const vertex of mesh.vertices) {
            // TODO: Move to object and update on object translation, rotation, scale
            const objectMatrix = Canvas2DRenderer.calculateObjectMatrix(object)

            let m4 = Matrix4.multiplyMatrix4(cameraMatrix, objectMatrix)
            m4 = Matrix4.multiplyMatrix4(m4, projectionMatrix)
            projectedVertices.push(Canvas2DRenderer.projectVertex(vertex.clone(), m4))
        }

        for (let triangle of mesh.triangles) {
            this.renderTriangle(triangle, projectedVertices)
        }
    }

    /**
    * @param {Triangle} triangle
    * @param {Array<Vector2>} projectedVertices
    */
    renderTriangle(triangle, projectedVertices) {
        this.#canvas.drawWireframeTriangle(
            projectedVertices[triangle.vertices[0]],
            projectedVertices[triangle.vertices[1]],
            projectedVertices[triangle.vertices[2]],
            triangle.color
        )
    }

    /**
    * @param {Vertex} vertex
    * @param {Object3D} object
    */
    applyTransform(vertex, object) {
        vertex.position.multiplyScalar(object.scale)
        vertex.position.multiplyMatrix3(object.rotation)
        vertex.position.add(object.position)

        return vertex
    }

    /**
    * @param {Vertex} vertex
    */
    applyCameraSpaceTransform(vertex) {
        vertex.position.multiplyMatrix3(Matrix3.transpose(this.#camera.rotation))
        vertex.position.subtract(this.#camera.position)

        return vertex
    }

    /**
     * @param {Camera} camera
     *
     * @return {Matrix4}
     */
    static calculateCameraMatrix(camera) {
        const m4Rotation = Matrix4.fromMatrix3(camera.rotation).transpose()
        const m4Position = Matrix4.fromVector3(camera.position).transpose()

        return Matrix4.multiplyMatrix4(m4Rotation, m4Position)
    }

    /**
     * @param {Viewport} viewport
     * @param {{
     *    width: number,
     *    height: number
     * }} canvasSize
     *
     * @return {Matrix4}
     */
    static calculateProjectionMatrix(viewport, canvasSize) {
        const m4 = Matrix4.identity()
        const widthModifier = (viewport.distanceToCamera * canvasSize.width) / viewport.width
        const heightModifier = (viewport.distanceToCamera * canvasSize.height) / viewport.height

        m4.set(0, 0, widthModifier)
        m4.set(1, 1, heightModifier)

        return m4
    }

    /**
     * @param {Object3D} object
     *
     * @returns {Matrix4}
     */
    static calculateObjectMatrix(object) {
        const m4Scale = Matrix4.identity().multiplyScalar(object.scale).set(3, 3, 1)
        const m4Rotation = Matrix4.fromMatrix3(object.rotation)
        const m4Position = Matrix4.fromVector3(object.position)

        return Matrix4.multiplyMatrix4(Matrix4.multiplyMatrix4(m4Position, m4Rotation), m4Scale)
    }

    /**
     * @param {Vertex} vertex
     * @param {Matrix4} m4 - 3D to Canvas projection matrix
     *
     * @returns {Vector2}
     */
    static projectVertex(vertex, m4) {
        const vertexPosition = new Vector4(vertex.position)
        const projectedVertexPosition = vertexPosition.multiplyMatrix4(m4)
        projectedVertexPosition.divideScalar(projectedVertexPosition.z)

        return new Vector2(
            projectedVertexPosition.x,
            projectedVertexPosition.y,
        ).floor();
    }
}
