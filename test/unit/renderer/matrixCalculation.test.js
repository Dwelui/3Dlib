import { describe, expect, test } from "vitest";
import Camera from "../../../src/object/Camera.js";
import Renderer from "../../../src/render/Renderer.js";
import Matrix4 from "../../../src/math/Matrix4.js";
import Vector3 from "../../../src/math/Vector3.js";
import Viewport from "../../../src/Viewport.js";
import Canvas from "../../../src/Canvas.js";
import Color from "../../../src/Color.js";

describe.concurrent('camera matrix', () => {
    test('default', () => {
        const camera = new Camera()
        const cameraMatrix = Renderer.calculateCameraMatrix(camera)

        expect(cameraMatrix.toArray()).toStrictEqual([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ])
    })

    test('position', () => {
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

    test('rotation', () => {
        const degress = 90

        const camera = new Camera().rotateX(degress)
        const cameraMatrix = Renderer.calculateCameraMatrix(camera)

        const radians = degress * Math.PI / 180
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)

        expect(cameraMatrix.toArray()).toStrictEqual([
            1, 0, 0, 0,
            0, cos, sin, 0,
            0, -sin, cos, 0,
            0, 0, 0, 1,
        ])
    })

    test('rotation and position', () => {
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
            1, 0, 0, 0,
            0, cos, sin, 0,
            0, -sin, cos, 0,
            position.x, position.y, position.z, 1,
        ])
    })
})

describe.concurrent('3d to canvas matrix', () => {
    test('1x1x1 viewport and 100x100 canvas size', () => {
        const viewport = new Viewport({
            height: 1,
            width: 1
        }, 1)

        const m4 = Renderer.calculate3DtoCanvasMatrix(viewport, {
            height: 100,
            width: 100
        })

        expect(m4.toArray()).toStrictEqual([

        ])
    })
})
