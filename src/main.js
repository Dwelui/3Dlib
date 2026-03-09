import Canvas from "./Canvas.js"
import Camera from "./object/Camera.js"
import Canvas2DRenderer from "./render/Canvas2DRenderer.js"
import Instance from "./render/Instance.js"
import Viewport from "./Viewport.js"
import BoxModel from "./model/BoxModel.js"

const [width, height] = [window.innerWidth, window.innerHeight]

const camera = new Camera({
    viewport: new Viewport({ width: 3, height: 3 * height / width }, 1)
})

const canvas = new Canvas('#canvas', { width, height })
const renderer = new Canvas2DRenderer({ canvas, camera })

const instance = new Instance({
    model: new BoxModel(),
})

renderer.renderInstance(instance)
