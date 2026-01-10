import Vector3 from "./math/Vector3.js"
import Camera from "./object/Camera.js"
import Scene from "./object/Scene.js"
import Sphere from "./object/Sphere.js"

export default class RayTracer {
    /** @private @type{Camera} */ #camera
    /** @private @type{Scene} */ #scene
    /** @private @type{number} */ #rayMin
    /** @private @type{number} */ #rayMax

    /**
    * @param {Camera} camera
    * @param {Scene} camera
    * @param {number} rayMin - Must be positive.
    * @param {number} rayMax - Must be larger than `rayMin`.
    */
    constructor(camera, scene, rayMin, rayMax) {
        if (!(camera instanceof Camera)) throw new TypeError("Parameter 'camera' is not Camera")
        this.#camera = camera

        if (!(scene instanceof Scene)) throw new TypeError("Parameter 'scene' is not Scene")
        this.#scene = scene

        if (typeof rayMin !== 'number') throw new TypeError("Parameter 'rayMin' is not number")
        if (rayMin <= 0) throw new RangeError("Parameter 'rayMin' is not positive")
        this.#rayMin = rayMin

        if (typeof rayMax !== 'number') throw new TypeError("Parameter 'rayMax' is not number")
        if (rayMax <= rayMin) throw new RangeError("Parameter 'rayMax' is not larger than 'rayMin'")
        this.#rayMax = rayMax
    }

    /**
    * Calculates traced color for given viewport point.
    *
    * @param {Vector3} viewportPoint
    */
    trace(viewportPoint) {
        if (!(viewportPoint instanceof Vector3)) throw new TypeError("Parameter 'viewportPoint' is not Vector3")

        let closestIntersection = this.#rayMax
        let closestObject = null

        for (const object of this.#scene.objects) {
            if (object instanceof Sphere) {
                const isClosest = intersection => intersection >= this.#rayMin && intersection <= this.#rayMax && intersection < closestIntersection

                const [intersection1, intersection2] = this.#intersectSphere(viewportPoint, object)
                if ((isClosest(intersection1))) {
                    closestIntersection = intersection1
                    closestObject = object
                }

                if ((isClosest(intersection2))) {
                    closestIntersection = intersection2
                    closestObject = object
                }
            } else {
                console.warn(`Intersection not implemented for ${object.toJSON()}`)
                return null;
            }
        }

        if (closestObject === null) return null

        if (closestObject instanceof Sphere) {
            return closestObject.color
        } else {
            console.warn(`Object color not implemented ${closestObject.toJSON()}`)
            return null;
        }
    }

    #intersectSphere(viewportPoint, sphere) {
        if (!(viewportPoint instanceof Vector3)) throw new TypeError("Parameter 'viewportPoint' is not Vector3")
        if (!(sphere instanceof Sphere)) throw new TypeError("Parameter 'sphere' is not Sphere")

        return []
    }
}
