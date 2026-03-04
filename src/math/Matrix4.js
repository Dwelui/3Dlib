import Matrix from "./Matrix.js"

export default class Matrix4 extends Matrix {
    SIZE = 4

    /**
     * @overload
     * @param {number[]} values - Array be the length of square matricies (4, 9, 16...)
     * @param {number} [rows]
     * @param {number} [cols]
     *
     * @overload
     * @param {Matrix4} matrix
     */

    /** @param {any} args **/
    constructor(...args) {
        super(args)
    }
}
