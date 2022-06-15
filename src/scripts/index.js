import { Renderer, Geometry, Program, Mesh } from 'ogl';

import fragment from '../shaders/03/fragment.glsl'
import vertex from '../shaders/03/vertex.glsl'


class App {
    constructor() {
        this.cursor = {}
        this.sizes = {}

        this.cursor.x = 0
        this.cursor.y = 0

        this.createRenderer()
        this.createMesh()
        this.addListeners()
        this.getScreenSize()
        requestAnimationFrame(this.update.bind(this))
    }

    createRenderer() {
        this.renderer = new Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
        })

        this.gl = this.renderer.gl
        document.body.appendChild(this.gl.canvas)
    }

    createCamera() {
        this.camera = null
    }

    createMesh() {
        this.geometry = new Geometry( this.gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        })

        this.program = new Program( this.gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uCursorX: { value: 0 },
                uCursorY: { value: 0 }
            },
        })
        
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry, 
            program: this.program 
        })
    }

    
    update(time) {
        requestAnimationFrame(this.update.bind(this))

        this.program.uniforms.uTime.value = time * 0.001
        this.program.uniforms.uCursorX.value = this.cursor.x
        this.program.uniforms.uCursorY.value = this.cursor.y
        
        this.renderer.render({ scene: this.mesh })
    }

    getScreenSize () {
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        this.renderer.setSize(this.sizes.width, this.sizes.height)
    }

    onResize() {

    }

    addListeners() {
        window.addEventListener("mousemove", (e) => {
            this.cursor.x = ( e.clientX / this.sizes.width ) - 0.5
            this.cursor.y = ( e.clientY / this.sizes.height ) - 0.5

            console.log(this.cursor);
        })

        window.addEventListener("resize", this.onResize.bind(this))
    }

}


new App();