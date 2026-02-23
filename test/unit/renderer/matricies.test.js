import { expect, test } from "vitest";
import Camera from "../../../src/object/Camera.js";
import Renderer from "../../../src/render/Renderer.js";
import Matrix4 from "../../../src/math/Matrix4.js";

test('correctly calculate camera matrix', () => {
    const camera = new Camera()
    const cameraMatrix = Renderer.calculateCameraMatrix(camera)

    expect(cameraMatrix.toArray()).toStrictEqual(Matrix4.identity().toArray())
})

test('correctly calculate camera matrix with position offset', () => {
    const camera = new Camera()
    const cameraMatrix = Renderer.calculateCameraMatrix(camera)

    expect(cameraMatrix.toArray()).toStrictEqual(Matrix4.identity().toArray())
})
