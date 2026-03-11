import { describe, expect, test } from "vitest";
import Vector3 from "../../../src/math/Vector3.js";
import MatrixUtils from "../../../src/math/MatrixUtils.js";
import Matrix3 from "../../../src/math/Matrix3.js";

describe('Matrix', () => {
    describe('rotation', () => {
        test.for([
            {
                vector: new Vector3(Math.PI, 0, 0),
                expected: new Matrix3([
                    1, 0, 0,
                    0, Math.cos(Math.PI), -Math.sin(Math.PI),
                    0, Math.sin(Math.PI), Math.cos(Math.PI)
                ])
            },
            {
                vector: new Vector3(0, Math.PI, 0),
                expected: new Matrix3([
                    Math.cos(Math.PI), 0, Math.sin(Math.PI),
                    0, 1, 0,
                    -Math.sin(Math.PI), 0, Math.cos(Math.PI),
                ])
            },
            {
                vector: new Vector3(0, 0, Math.PI),
                expected: new Matrix3([
                    Math.cos(Math.PI), -Math.sin(Math.PI), 0,
                    Math.sin(Math.PI), Math.cos(Math.PI), 0,
                    0, 0, 1,
                ])
            },
        ])('calculate rotation matrix from rotation vector', ({ vector, expected }) => {
            const m3 = MatrixUtils.calculateRotationMatrix(vector)

            for (let i = 0; i < m3.length; i++) {
                expect(m3[i]).toBeCloseTo(expected[i])
            }
        })
    })
})
