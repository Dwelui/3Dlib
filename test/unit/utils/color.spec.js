import { describe, expect, test } from "vitest";
import Color from "../../../src/Color.js";

describe('Color', () => {
    const arrayInputs = [
        { values: [10, 20, 30, 40], expected: [10, 20, 30, 40] },
        { values: [10, 20, 30], expected: [10, 20, 30, 255] },
        { values: [-10, 20, 30, 300], expected: [0, 20, 30, 255] },
    ]

    describe('construction & conversion', () => {
        test.for(arrayInputs)('constructor ($constructor) creates from array with correct values', ({ values, expected }) => {
            const c = new Color(...values)

            expect(c.toArray()).toEqual(expected)
        })
    })
})
