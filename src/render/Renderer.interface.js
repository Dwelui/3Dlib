/**
* Interface for classes that are backend for rendering graphics.
*
* @interface
*/
class Renderer { }

Renderer.prototype.renderScene = function () {
    throw new Error('not implemented')
}
