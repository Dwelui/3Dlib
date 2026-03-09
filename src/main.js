import Canvas from "./Canvas.js"
import Vector3 from "./math/Vector3.js"
import Camera from "./object/Camera.js"
import Transform from "./render/Transform.js"
import Triangle from "./render/Triangle.js"
import Canvas2DRenderer from "./render/Canvas2DRenderer.js"
import Instance from "./render/Instance.js"
import Model from "./render/Model.js"
import Vertex from "./render/Vertex.js"
import Viewport from "./Viewport.js"

const [width, height] = [window.innerWidth, window.innerHeight]

const camera = new Camera({
    viewport: new Viewport({ width: 3, height: 3 * height / width }, 1)
})

const canvas = new Canvas('#canvas', { width, height })
const renderer = new Canvas2DRenderer({ canvas, camera })

const triangle1 = new Triangle(
    new Vertex(new Vector3(-1, 1, 5)),
    new Vertex(new Vector3(1, -1, 5)),
    new Vertex(new Vector3(-1, -1, 5)),
)
const triangle2 = new Triangle(
    new Vertex(new Vector3(-1, 1, 5)),
    new Vertex(new Vector3(1, 1, 5)),
    new Vertex(new Vector3(1, -1, 5)),
)

const instance = new Instance(
    new Model([triangle1, triangle2]),
    new Transform()
)

renderer.renderInstance(instance)
