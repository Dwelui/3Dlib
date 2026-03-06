import Matrix4 from "./Matrix4.js"
import Transform from "../object/Transform.js"
import Matrix from "./Matrix.js"

export default class RendererUtils {
    /**
     * Returns matrix for projecting and mapping to canvas.
     *
     * @param {number} canvasWidth
     * @param {number} canvasHeight
     * @param {number} viewportWidth
     * @param {number} viewportHeight
     * @param {number} viewportDistance
     *
     * @return {Matrix4}
     */
    static calculateProjectionAndMappingMatrix(
        canvasWidth,
        canvasHeight,
        viewportWidth,
        viewportHeight,
        viewportDistance
    ) {
        const widthModifier = (viewportDistance * canvasWidth) / viewportWidth
        const heightModifier = (viewportDistance * canvasHeight) / viewportHeight

        return new Matrix4([
            widthModifier, 0, 0, 0,
            0, heightModifier, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 0
        ])
    }

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
}
