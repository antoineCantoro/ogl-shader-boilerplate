import { Renderer, Geometry, Program, Mesh, Texture, TextureLoader } from 'ogl';

import fragment from '../shaders/12/fragment.glsl'
import vertex from '../shaders/12/vertex.glsl'


import image01 from "../images/01.jpg"
import image02 from "../images/02.jpg"


class App {
    constructor() {
        this.cursor = {}
        this.sizes = {}

        this.cursor.x = 0
        this.cursor.y = 0

        this.createRenderer()
        this.createImageTexture()
        this.createMesh()
        this.addListeners()
        this.getScreenSize()
        this.onResize()
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
                uCursorY: { value: 0 },
                textureMap01: { value: this.imageTexture01 },
                textureMap02: { value: this.imageTexture02 }
            },
        })
        
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry, 
            program: this.program 
        })
    }

    createImageTexture() {
        // Upload empty texture while source loading
        this.imageTexture01 = new Texture(this.gl);
        this.imageTexture02 = new Texture(this.gl);

        // update image value with source once loaded
        const img01 = new Image();
        img01.src = image01;
        img01.onload = () => (this.imageTexture01.image = img01);
        
        const img02 = new Image()
        img02.src = image02
        img02.onload = () => (this.imageTexture02.image = img02)
    }

    
    update(time) {
        requestAnimationFrame(this.update.bind(this))

        this.program.uniforms.uTime.value = time * 0.001
        this.program.uniforms.uCursorX.value = this.cursor.x
        this.program.uniforms.uCursorY.value = this.cursor.y

        // console.log(this.program.uniforms);
        
        this.renderer.render({ scene: this.mesh })
    }

    getScreenSize () {
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight
    }

    onResize() {
        this.getScreenSize()
        this.renderer.setSize(this.sizes.width,this.sizes.height)
    }   

    addListeners() {
        window.addEventListener("mousemove", (e) => {
            this.cursor.x = ( e.clientX / this.sizes.width ) - 0.5
            this.cursor.y = ( e.clientY / this.sizes.height ) - 0.5

            // console.log(this.cursor);
        })

        window.addEventListener("resize", this.onResize.bind(this))
    }

}


new App();