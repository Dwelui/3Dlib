import Matrix from "./Matrix.js"

export default class Matrix3 extends Matrix {
    static SIZE = 3

    /**
     * @overload
     * @param {number[]} [values] - Array be the length of square matricies (4, 9, 16...)
     *
     * @overload
     * @param {Matrix3} matrix
     */

    /** @param {any} args **/
    constructor(...args) {
        super(args)
    }
}
