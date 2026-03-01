import Scene from "../object/Scene.js"

/** @interface */
export default class RendererInterface {

    /**
     * @param {Scene} scene
     *
     * @returns {void}
     */
    renderScene(scene) { };
}

