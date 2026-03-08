import Canvas from "./Canvas.js"
import Vector3 from "./math/Vector3.js"
import Camera from "./object/Camera.js"
import Triangle from "./object/Triangle.js"
import Canvas2DRenderer from "./render/Canvas2DRenderer.js"
import Vertex from "./render/Vertex.js"
import Viewport from "./Viewport.js"

const [width, height] = [window.innerWidth, window.innerHeight]

const camera = new Camera({
    viewport: new Viewport({ width: 3, height: 3 * height / width }, 1)
})

const canvas = new Canvas('#canvas', { width, height })
const renderer = new Canvas2DRenderer({ canvas, camera })

const triangle = new Triangle(
    new Vertex(new Vector3(-1, -1, 5)),
    new Vertex(new Vector3(0, 2, 5)),
    new Vertex(new Vector3(1, 1, 5)),
)
renderer.renderTriangle(triangle)
