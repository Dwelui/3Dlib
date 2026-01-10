import Canvas from "./Canvas.js"
import Color from "./math/Color.js"
import Vector3 from "./math/Vector3.js"
import Camera from "./object/Camera.js"

const canvas = new Canvas('#canvas', { width: 500, height: 500 })
const camera = new Camera(new Vector3())

canvas.clear()

for (let x = -1 * canvas.width / 2; x < canvas.width / 2; x++) {
    for (let y = -1 * canvas.height / 2; y < canvas.height / 2; y++) {
        canvas.putPixel(x, y, new Color(255, 0, 0))
    }
}
