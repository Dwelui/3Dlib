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
let batchSize = 1

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
        const { xBounds, yBounds } = ev.data;

        TraceRayBatch(xBounds, yBounds)
    }
}

/**
* @param {Array<number>} xBounds
* @param {Array<number>} yBounds
*/
function TraceRayBatch(xBounds, yBounds) {
    if (!rayTracer || !camera || !viewport || !intersectionMin || !intersectionMax || !recursionDepth || !xBounds || !yBounds || !width || !height) {
        console.log({rayTracer, camera, viewport, intersectionMin, intersectionMax, recursionDepth, xBounds, yBounds, width, height})
        throw new Error('Worker not initialized')
    }

    let result = []

    for (let x = xBounds[0]; x < xBounds[1]; x++) {
        for (let y = yBounds[0]; y < yBounds[1]; y++) {
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
                postMessage(result)
                result = []
            }
        }
    }

    postMessage(result)
}
