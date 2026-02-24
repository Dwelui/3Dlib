import Canvas from "../Canvas.js"
import Matrix3 from "../math/Matrix3.js"
import Matrix4 from "../math/Matrix4.js"
import Vector2 from "../math/Vector2.js"
import Vector4 from "../math/Vector4.js"
import Camera from "../object/Camera.js"
import Object3D from "../object/Object3D.js"
import Scene from "../object/Scene.js"
import Viewport from "../Viewport.js"
import Triangle from "./Triangle.js"
import Vertex from "./Vertex.js"

export default class Renderer {
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
    * @param {Scene} scene
    */
    renderScene(scene) {
        // TODO: Might want to move to camera object and update only on camera rotation or position updates.
        const cameraMatrix = Renderer.calculateCameraMatrix(this.#camera)

        for (const object of scene.objects) {
            this.renderObject(object, cameraMatrix)
        }
    }

    /**
    * @param {Object3D} object
    * @param {Matrix4} cameraMatrix
    */
    renderObject(object, cameraMatrix) {
        const mesh = object.mesh
        if (!mesh) return

        /** @type {Array<Vector2>} */
        const projectedVertices = []
        for (const vertex of mesh.vertices) {
            const transformedVertex = this.applyTransform(vertex.clone(), object)
            const cameraSpaceVertex = this.applyCameraSpaceTransform(transformedVertex)
            projectedVertices.push(this.#canvas.projectVertexOld(cameraSpaceVertex))
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
    static calculate3DtoCanvasMatrix(viewport, canvasSize) {
        const m4 = Matrix4.identity()
        const widthModifier = (viewport.distanceToCamera * canvasSize.width) / viewport.width
        const heightModifier = (viewport.distanceToCamera * canvasSize.height) / viewport.height

        m4.set(0, 0, widthModifier)
        m4.set(1, 1, heightModifier)

        return m4
    }

    /**
     * @param {Vector4} vertex
     * @param {Matrix4} m4 - 3D to Canvas projection matrix
     *
     * @returns {Vector2}
     */
    static projectVertex(vertex, m4) {
        const projectedVertex = vertex.clone().multiplyMatrix4(m4)
        projectedVertex.divideScalar(projectedVertex.z)

        return new Vector2(
            projectedVertex.x,
            projectedVertex.y,
        ).floor();
    }
}
