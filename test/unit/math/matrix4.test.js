import { expect, test } from "vitest";
import Matrix3 from "../../../src/math/Matrix3.js"
import Matrix4 from "../../../src/math/Matrix4.js";
import Vector3 from "../../../src/math/Vector3.js";

test('from matrix3', () => {
    const m3 = new Matrix3([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ])

    const m4 = Matrix4.fromMatrix3(m3)

    expect(m4.toArray()).toStrictEqual([
        m3.get(0), m3.get(1), m3.get(2), 0,
        m3.get(3), m3.get(4), m3.get(5), 0,
        m3.get(6), m3.get(7), m3.get(8), 0,
        0, 0, 0, 1,
    ])
})

test('from vector3', () => {
    const v3 = new Vector3(1, 2, 3)

    const m4 = Matrix4.fromVector3(v3)

    expect(m4.toArray()).toStrictEqual([
        1, 0, 0, v3.x,
        0, 1, 0, v3.y,
        0, 0, 1, v3.z,
        0, 0, 0, 1,
    ])
})

test('invert', () => {
    const m4 = new Matrix4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ])

    expect(m4.transpose().toArray()).toStrictEqual([
        1, 5, 9, 13,
        2, 6, 10, 14,
        3, 7, 11, 15,
        4, 8, 12, 16,
    ])
})
