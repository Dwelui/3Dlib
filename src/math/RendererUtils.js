import Matrix4 from "./Matrix4.js"
import Transform from "../render/Transform.js"
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
        const rotationM3 = cameraTransform.transpose()
        const rotationM4 = new Matrix4([
            rotationM3[0], rotationM3[1], rotationM3[2], 0,
            rotationM3[3], rotationM3[4], rotationM3[5], 0,
            rotationM3[6], rotationM3[7], rotationM3[8], 0,
            0, 0, 0, 1
        ])

        const positionV3 = cameraTransform.position
        const positionM4 = new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            positionV3[0], positionV3[1], positionV3[2], 1
        ])

        return positionM4.multiplyMatrix(rotationM4)
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
