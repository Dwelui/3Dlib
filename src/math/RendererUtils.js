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
        const rotationM3I = cameraTransform.rotationMatrix.transpose()
        const rotationM4 = new Matrix4([
            rotationM3I[0], rotationM3I[1], rotationM3I[2], 0,
            rotationM3I[3], rotationM3I[4], rotationM3I[5], 0,
            rotationM3I[6], rotationM3I[7], rotationM3I[8], 0,
            0, 0, 0, 1
        ])

        const positionV3 = cameraTransform.position
        const positionM4I = new Matrix4([
            1, 0, 0, -positionV3.x,
            0, 1, 0, -positionV3.y,
            0, 0, 1, -positionV3.z,
            0, 0, 0, 1
        ])

        return positionM4I.multiplyMatrix(rotationM4)
    }

    /**
     * @param {Transform} modelTransform
     *
     * @return {Matrix4}
     */
    static calculateModelMatrix(modelTransform) {
        const scaleM4 = new Matrix4([
            modelTransform.scale, 0, 0, 0,
            0, modelTransform.scale, 0, 0,
            0, 0, modelTransform.scale, 0,
            0, 0, 0, 1,
        ])

        const rotationM3 = modelTransform.rotationMatrix
        const rotationM4 = new Matrix4([
            rotationM3[0], rotationM3[1], rotationM3[2], 0,
            rotationM3[3], rotationM3[4], rotationM3[5], 0,
            rotationM3[6], rotationM3[7], rotationM3[8], 0,
            0, 0, 0, 1
        ])

        const positionV3 = modelTransform.position
        const positionM4 = new Matrix4([
            1, 0, 0, positionV3.x,
            0, 1, 0, positionV3.y,
            0, 0, 1, positionV3.z,
            0, 0, 0, 1
        ])

        return scaleM4.multiplyMatrix(rotationM4).multiplyMatrix(positionM4)
    }
}
