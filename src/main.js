import Canvas from "./Canvas.js"
import Color from "./Color.js"
import RendererUtils from "./math/RendererUtils.js"
import Vector3 from "./math/Vector3.js"
import Vector4 from "./math/Vector4.js"
import Camera from "./object/Camera.js"
import Triangle from "./object/Triangle.js"
import Canvas2DRenderer from "./render/Canvas2DRenderer.js"
import Vertex from "./render/Vertex.js"
import Viewport from "./Viewport.js"

const [width, height] = [window.innerWidth, window.innerHeight]

const viewport = new Viewport({ width: 2, height: 2 * height / width }, 1)
const camera = new Camera()

const canvas = new Canvas('#canvas', { width, height })

// const boxMesh = new BoxMesh()
// // TODO implement rotation to be passed into initilization
// const box1 = new Object3D({
//     mesh: boxMesh,
//     scale: 3,
//     position: new Vector3(0, 0, 5)
// }).rotateY(45)
//
// const box2 = new Object3D({
//     mesh: boxMesh,
//     position: new Vector3(1, 2, 3)
// })
//
// new Renderer({ canvas, camera }).renderScene(
//     new Scene().add([box1, box2]),
// )

const renderer = new Canvas2DRenderer({ canvas, camera })

const triangle = new Triangle(
    new Vertex(new Vector3(-1, -1, 5)),
    new Vertex(new Vector3(0, 2, 5)),
    new Vertex(new Vector3(1, 1, 5)),
)
renderer.renderTriangle(triangle)
