import { disableAsserts } from "../Assert.js"
import Matrix3 from "../math/Matrix3.js"
import Camera from "../object/Camera.js"
import Scene from "../object/Scene.js"
import RayTracer from "../RayTracer.js"
import Viewport from "../Viewport.js"

disableAsserts()

/** @type {?number} */
let id = null
let scene = null
/** @type {?RayTracer} */
let rayTracer = null
/** @type {?Camera} */
let camera = null
/** @type {?Viewport} */
let viewport = null
/** @type {?number} */
let intersectionMin = null
/** @type {?number} */
let intersectionMax = null
/** @type {?number} */
let recursionDepth = null
/** @type {?number} */
let width = null
/** @type {?number} */
let height = null

/** @type Int32Array */
let chunks
/** @type Uint8ClampedArray */
let pixels

onmessage = (ev) => {
    const { type } = ev.data

    if (type === 'initialize') {
        const { sceneJSON, cameraJSON, viewportJSON, sharedPixelBuffer, sharedChunkBuffer } = ev.data;
        ({ id, intersectionMin, intersectionMax, recursionDepth, width, height } = ev.data)

        chunks = new Int32Array(sharedChunkBuffer)
        pixels = new Uint8ClampedArray(sharedPixelBuffer)
        scene = Scene.fromJSON(sceneJSON)
        rayTracer = new RayTracer(scene)
        camera = Camera.fromJSON(cameraJSON)
        viewport = Viewport.fromJSON(viewportJSON)
    }

    if (type === 'trace') {
        const chunkPosition = ev.data.chunk.id
        const chunk = [
            chunks[chunkPosition + 0],
            chunks[chunkPosition + 1],
            chunks[chunkPosition + 2],
            chunks[chunkPosition + 3],
        ]

        TraceRayBatch(ev.data.chunk.id, chunk)
    }
}

/**
* @param {number} chunkId
* @param {Array<number>} chunk
*/
function TraceRayBatch(chunkId, chunk) {
    if (!rayTracer || !camera || !viewport || !intersectionMin || !intersectionMax || !recursionDepth || !width || !height) {
        console.log({ id, rayTracer, camera, viewport, intersectionMin, intersectionMax, recursionDepth, width, height })
        throw new Error('Worker not initialized')
    }

    for (let x = chunk[0]; x < chunk[1]; x++) {
        const offsetX = (Math.floor(x + width / 2))

        for (let y = chunk[2]; y < chunk[3]; y++) {
            const rayDirection = Matrix3.multiplyVector3(camera.rotation, viewport.fromCanvas(x, y, width, height))

            const color = rayTracer.traceRay(
                camera.position,
                rayDirection,
                intersectionMin,
                intersectionMax,
                recursionDepth
            )

            const pixelIndex = ((Math.floor(height / 2 - y)) * width + offsetX) * 4
            const rgba = color?.rgba
            if (rgba) {
                pixels[pixelIndex + 0] = rgba[0]
                pixels[pixelIndex + 1] = rgba[1]
                pixels[pixelIndex + 2] = rgba[2]
                pixels[pixelIndex + 3] = 255
            } else {
                pixels[pixelIndex + 0] = 255
                pixels[pixelIndex + 1] = 255
                pixels[pixelIndex + 2] = 255
                pixels[pixelIndex + 3] = 255
            }
        }
    }

    postMessage({ workerId: id, chunkId })
}
