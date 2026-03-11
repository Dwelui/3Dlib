import Canvas from "./Canvas.js"
import Camera from "./object/Camera.js"
import Canvas2DRenderer from "./render/Canvas2DRenderer.js"
import Instance from "./render/Instance.js"
import Viewport from "./Viewport.js"
import BoxModel from "./model/BoxModel.js"
import Transform from "./render/Transform.js"
import Vector3 from "./math/Vector3.js"
import Scene from "./object/Scene.js"

const [width, height] = [window.innerWidth, window.innerHeight]

const canvas = new Canvas('#canvas', { width, height })
const camera = new Camera({
    viewport: new Viewport({ width: 2, height: 2 * height / width }, 1),
    transform: new Transform(
        new Vector3(0, 0, 8),
    )
})

const box1 = new Instance({
    model: new BoxModel({ width: 3, height: 3, length: 3 }),
    transform: new Transform(
        new Vector3(-2, -2, 0),
        new Vector3(0, Math.PI / 6)
    )
})

const box2 = new Instance({
    model: new BoxModel({ width: 3, height: 3, length: 3 }),
    transform: new Transform(
        new Vector3(2, 2, 0),
        new Vector3(0, Math.PI / 5)
    )
})

const scene = new Scene({ instances: [box1, box2] })
new Canvas2DRenderer({ canvas, camera }).renderScene(scene)
