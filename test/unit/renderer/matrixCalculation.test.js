import { describe, expect, test } from "vitest";
import Vector2 from "../../../src/math/Vector2.js";
import Vector3 from "../../../src/math/Vector3.js";
import Vector4 from "../../../src/math/Vector4.js";
import Camera from "../../../src/object/Camera.js";
import Object3D from "../../../src/object/Object3D.js";
import Renderer from "../../../src/render/Renderer.js";
import Viewport from "../../../src/Viewport.js";
import Vertex from "../../../src/render/Vertex.js";

describe('camera matrix', () => {
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

describe('3d to canvas matrix', () => {
    test('1x1x1 viewport and 100x100 canvas size', () => {
        const viewportWidth = 1
        const viewportHeight = 1
        const viewportDistance = 1
        const canvasWidth = 100
        const canvasHeight = 100

        const viewport = new Viewport({
            width: viewportWidth,
            height: viewportHeight,
        }, viewportDistance)

        const m4 = Renderer.calculateProjectionMatrix(viewport, {
            height: canvasHeight,
            width: canvasWidth
        })

        const widthModifier = (viewportDistance * canvasWidth) / viewportWidth
        const heightModifier = (viewportDistance * canvasHeight) / viewportHeight

        expect(m4.toArray()).toStrictEqual([
            widthModifier, 0, 0, 0,
            0, heightModifier, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ])
    })

    test('1x1x1 viewport and 100x100 canvas size project vertex (1 2 3 1)', () => {
        const viewportWidth = 1
        const viewportHeight = 1
        const viewportDistance = 1
        const canvasWidth = 100
        const canvasHeight = 100
        const vertex = new Vertex(new Vector3(1, 2, 3))

        const viewport = new Viewport({
            width: viewportWidth,
            height: viewportHeight,
        }, viewportDistance)

        const m4 = Renderer.calculateProjectionMatrix(viewport, {
            height: canvasHeight,
            width: canvasWidth
        })

        const widthModifier = (viewportDistance * canvasWidth) / viewportWidth
        const heightModifier = (viewportDistance * canvasHeight) / viewportHeight

        const expectedProjectedVertex = new Vector2(
            widthModifier * vertex.position.x / vertex.position.z,
            heightModifier * vertex.position.y / vertex.position.z,
        ).floor()

        const projectedVertex = Renderer.projectVertex(vertex, m4)

        expect(projectedVertex.toArray()).toStrictEqual(expectedProjectedVertex.toArray())
    })
})

describe('object matrix', () => {
    test.each([
        {
            position: new Vector3(1, 2, 3), scale: 2, rotation: 90, expected: [
                2, 0, 0, 1,
                0, 1.2246467991473532e-16, -2, 2,
                0, 2, 1.2246467991473532e-16, 3,
                0, 0, 0, 1
            ]
        }
    ])('calculate for (position: $position, scale: $scale, rotation: $rotation)', ({ position, scale, rotation, expected }) => {
        const object = new Object3D({
            position, scale
        }).rotateX(rotation)

        const m4 = Renderer.calculateObjectMatrix(object)

        expect(m4.toArray()).toStrictEqual(expected)
    })
})
