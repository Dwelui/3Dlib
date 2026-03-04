/**
* @typedef MatrixObject
* @property {Record<string, number>} values
* @property {number} rows
* @property {number} cols
*/

import Matrix from "./Matrix.js"

export default class Matrix2 extends Matrix {
    SIZE = 2

    /**
     * @overload
     * @param {number[]} values - Array be the length of square matricies (4, 9, 16...)
     * @param {number} [rows]
     * @param {number} [cols]
     *
     * @overload
     * @param {Matrix2} matrix
     */

    /** @param {any} args **/
    constructor(...args) {
        super(args)
    }
}
