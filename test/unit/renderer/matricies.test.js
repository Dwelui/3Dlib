import { expect, test } from "vitest";
import Camera from "../../../src/object/Camera.js";
import Renderer from "../../../src/render/Renderer.js";
import Matrix4 from "../../../src/math/Matrix4.js";
import Vector3 from "../../../src/math/Vector3.js";

test('correctly calculate camera matrix', () => {
    const camera = new Camera()
    const cameraMatrix = Renderer.calculateCameraMatrix(camera)

    expect(cameraMatrix.toArray()).toStrictEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ])
})

test('correctly calculate camera matrix with position offset', () => {
    const position = new Vector3(1, 2, 3)

    const camera = new Camera({
        position
    })
    const cameraMatrix = Renderer.calculateCameraMatrix(camera)

    expect(cameraMatrix.toArray()).toStrictEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        position.x, position.y, position.z, 1,
    ])
})

test('correctly calculate camera matrix with rotation', () => {
    const degress = 90

    const camera = new Camera().rotateX(degress)
    const cameraMatrix = Renderer.calculateCameraMatrix(camera)

    const radians = degress * Math.PI / 180
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)

    expect(cameraMatrix.toArray()).toStrictEqual([
        1, 0, 0, 0,
        0, cos, -1 * sin, 0,
        0, sin, cos, 0,
        0, 0, 0, 1,
    ])
})

test('correctly calculate camera matrix with rotation and position', () => {
    const degress = 90
    const position = new Vector3(1, 2, 3)

    const camera = new Camera({
        position
    }).rotateX(degress)
    const cameraMatrix = Renderer.calculateCameraMatrix(camera)

    const radians = degress * Math.PI / 180
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)

    expect(cameraMatrix.toArray()).toStrictEqual([
        1, 0, 0, position.x,
        0, cos, -1 * sin, - position.z,
        0, sin, cos, position.y,
        0, 0, 0, 1,
    ])
})
