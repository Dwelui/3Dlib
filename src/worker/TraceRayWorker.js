import Matrix3 from "../math/Matrix3.js"
import Camera from "../object/Camera.js"
import Scene from "../object/Scene.js"
import RayTracer from "../RayTracer.js"
import Viewport from "../Viewport.js"

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
let batchSize = 100

onmessage = (ev) => {
    /**
    * @type {{
    *   type: 'initialize'|'trace',
    *   sceneJSON: any,
    *   cameraJSON: any,
    *   viewportJSON: any,
    *   intersectionMin: number,
    *   intersectionMax: number,
    *   recursionDepth: number,
    *   xBounds: Array<number>,
    *   yBounds: Array<number>,
    * }} data
    */

    const { type } = ev.data

    if (type === 'initialize') {
        const { sceneJSON, cameraJSON, viewportJSON } = ev.data;
        ({ intersectionMin, intersectionMax, recursionDepth, width, height } = ev.data)

        scene = Scene.fromJSON(sceneJSON)
        rayTracer = new RayTracer(scene)
        camera = Camera.fromJSON(cameraJSON)
        viewport = Viewport.fromJSON(viewportJSON)
    }

    if (type === 'trace') {
        TraceRayBatch(ev.data.chunk)
    }
}

/**
* @param {Object} args
* @param {number} args.id
* @param {Array<number>} args.xChunk
* @param {Array<number>} args.yChunk
*/
function TraceRayBatch({ id, xChunk, yChunk }) {
    if (!rayTracer || !camera || !viewport || !intersectionMin || !intersectionMax || !recursionDepth || !width || !height) {
        console.log({ rayTracer, camera, viewport, intersectionMin, intersectionMax, recursionDepth, width, height })
        throw new Error('Worker not initialized')
    }

    let result = []

    for (let x = xChunk[0]; x < xChunk[1]; x++) {
        for (let y = yChunk[0]; y < yChunk[1]; y++) {
            const rayDirection = Matrix3.multiplyVector3(camera.rotation, viewport.fromCanvas(x, y, width, height))

            const color = rayTracer.traceRay(
                camera.position,
                rayDirection,
                intersectionMin,
                intersectionMax,
                recursionDepth
            )

            result.push({
                color: color ? color.toJSON() : null,
                x,
                y
            })

            if (result.length === batchSize) {
                postMessage({ id, isFinished: false, result })
                result = []
            }
        }
    }

    postMessage({ id, isFinished: true, result })
}
