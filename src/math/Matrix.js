export default class Matrix extends Float64Array {
    SIZE = Infinity

    #rows = 0
    #cols = 0

    /**
     * @overload
     * @param {number[]} values - Array be the length of square matricies (4, 9, 16...)
     * @param {number} [rows]
     * @param {number} [cols]
     *
     * @overload
     * @param {Matrix} matrix
     */

    /** @param {...(number[] | number | undefined | Matrix)} args **/
    constructor(...args) {
        /** @type {number[]} */
        let values = []
        let l = null, rows = null, cols = null

        if (Array.isArray(args[0])) {
            values = args[0]
            if (args.length === 1) {
                const temp = Math.sqrt(args[0].length)
                if (temp % 1 === 0) {
                    rows = cols = temp
                }
            } else if (
                args.length === 3 &&
                typeof args[1] === "number" &&
                typeof args[2] === "number"
            ) {
                rows = args[1]
                cols = args[2]
            }
        } else if (args[0] instanceof Matrix) {
            values = [...args[0]]

            rows = args[0].rows
            cols = args[0].cols
        }

        if (rows === null || cols === null) {
            throw Error("Matrix: invalid arguments provided.")
        }

        l = rows * cols

        super(l)
        for (let i = 0; i < l; i++) {
            this[i] = values[i] ?? 0
        }

        this.#rows = rows
        this.#cols = cols
    }

    get rows() { return this.#rows }
    get cols() { return this.#cols }
}
