import Canvas from "./Canvas.js"
import Color from "./Color.js"
import Vector3 from "./math/Vector3.js"
import Box from "./object/Box.js"
import BoxMesh from "./render/BoxMesh.js"
import Viewport from "./Viewport.js"

const [width, height] = [window.innerWidth, window.innerHeight]

const viewport = new Viewport({ width: 1, height: 1 * height / width }, 1)

const canvas = new Canvas('#canvas', {
    width,
    height,
    backroundColor: new Color(255, 255, 255),
    viewport
})

const boxMesh = new BoxMesh()
const box1 = new Box({
    mesh: boxMesh,
    position: new Vector3(0, 0, 5)
})

const box2 = new Box({
    mesh: boxMesh,
    position: new Vector3(1, 2, 3)
})

canvas.renderObject(box1.mesh.vertices, box1.mesh.triangles)
