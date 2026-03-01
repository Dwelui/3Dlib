import Matrix4 from "./Matrix4.js"
import Transform from "../object/Transform.js"

export default class RendererUtils {
    /**
     * @param {Transform} cameraTransform
     *
     * @return {Matrix4}
     */
    static calculateCameraMatrix(cameraTransform) {
        throw new Error('implement')
    }

    /**
     * @param {Transform} modelTransform
     *
     * @return {Matrix4}
     */
    static calculateModelMatrix(modelTransform) {
        throw new Error('implement')
    }

    /**
     * @param {number} canvasWidth
     * @param {number} canvasHeight
     * @param {number} viewportWidth
     * @param {number} viewportHeight
     *
     * @return {Matrix4}
     */
    static calculateProjectionMatrix(canvasWidth, canvasHeight, viewportWidth, viewportHeight) {
        throw new Error('implement')
    }
}
