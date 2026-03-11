import { describe, expect, test } from "vitest";
import RendererUtils from "../../../src/math/RendererUtils.js";
import Vertex from "../../../src/render/Vertex.js";
import Vector4 from "../../../src/math/Vector4.js";
import Canvas2DRenderer from "../../../src/render/Canvas2DRenderer.js";
import Vector3 from "../../../src/math/Vector3.js";
import Transform from "../../../src/render/Transform.js";
import Matrix3 from "../../../src/math/Matrix3.js";
import Matrix4 from "../../../src/math/Matrix4.js";

describe('Transform matrix', () => {
    describe('Projection', () => {
        test.each([
            {
                vertex: new Vertex(new Vector3(1, 2, 3)),
                matrixArguments: { canvasWidth: 1920, canvasHeight: 1080, viewportWidth: 1.777777778, viewportHeight: 1, viewportDistance: 1 },
                expected: [359, 720]
            },
        ])('project vertex ($vertex.position) using projection and mapping matrix ($expected)',
            ({ vertex, matrixArguments, expected }) => {
                const { canvasWidth, canvasHeight, viewportWidth, viewportHeight, viewportDistance } = matrixArguments

                const m4 = RendererUtils.calculateProjectionAndMappingMatrix(canvasWidth, canvasHeight, viewportWidth, viewportHeight, viewportDistance)

                const projectedVertex = Canvas2DRenderer.projectVertex(vertex, m4)

                for (let i = 0; i < projectedVertex.length; i++) {
                    expect(projectedVertex[i]).toBe(expected[i])
                }
            })
    })

    describe('Camera', () => {
        test.each([
            {
                transform: new Transform(
                    new Vector3(1, 1, 1),
                ),
                expected: new Matrix4([
                    1, 0, 0, -1,
                    0, 1, 0, -1,
                    0, 0, 1, -1,
                    0, 0, 0, 1,
                ])
            },
            {
                transform: new Transform(
                    new Vector3(1, 1, 1),
                    new Vector3(0, 0, Math.PI)
                ),
                expected: new Matrix4([
                    Math.cos(Math.PI), Math.sin(Math.PI), 0, -1,
                    -Math.sin(Math.PI), Math.cos(Math.PI), 0, -1,
                    0, 0, 1, -1,
                    0, 0, 0, 1,
                ])
            },
        ])('calculate matrix', ({ transform, expected }) => {
            const m4 = RendererUtils.calculateCameraMatrix(transform)

            expect(m4.toArray()).toEqual(expected.toArray())
        })

        test.each([
            {
                transform: new Transform(
                    new Vector3(1, 1, 1),
                ),
                vertex: new Vertex(new Vector3(1, 2, 3)),
                expected: new Vertex(new Vector3(0, 1, 2))
            },
        ])('apply matrix to vertex correctly', ({ transform, vertex, expected }) => {
            const m4 = RendererUtils.calculateCameraMatrix(transform)

            const modifiedVertex = vertex.clone().applyTransformMatrix(m4)

            expect(modifiedVertex.position.toArray()).toEqual(expected.position.toArray())
        })
    })

    describe('Instance', () => {
        test.each([
            {
                transform: new Transform(
                    new Vector3(1, 1, 1),
                ),
                expected: new Matrix4([
                    1, 0, 0, 1,
                    0, 1, 0, 1,
                    0, 0, 1, 1,
                    0, 0, 0, 1,
                ])
            },
            {
                transform: new Transform(
                    new Vector3(),
                    new Vector3(0, 0, Math.PI)
                ),
                expected: new Matrix4([
                    Math.cos(Math.PI), -Math.sin(Math.PI), 0, 0,
                    Math.sin(Math.PI), Math.cos(Math.PI), 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ])
            },
            {
                transform: new Transform(
                    new Vector3(),
                    new Vector3(),
                    3
                ),
                expected: new Matrix4([
                    3, 0, 0, 0,
                    0, 3, 0, 0,
                    0, 0, 3, 0,
                    0, 0, 0, 1,
                ])
            },
            {
                transform: new Transform(
                    new Vector3(1, 1, 1),
                    new Vector3(0, 0, Math.PI)
                ),
                expected: new Matrix4([
                    Math.cos(Math.PI), -Math.sin(Math.PI), 0, 1,
                    Math.sin(Math.PI), Math.cos(Math.PI), 0, 1,
                    0, 0, 1, 1,
                    0, 0, 0, 1,
                ])
            },
        ])('calculate matrix', ({ transform, expected }) => {
            const m4 = RendererUtils.calculateModelMatrix(transform)

            for (let i = 0; i < m4.length; i++)
                expect(m4[i]).toBeCloseTo(expected[i])
        })
    })
})
