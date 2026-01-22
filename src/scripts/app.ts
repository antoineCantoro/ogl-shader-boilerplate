import { Renderer, Geometry, Program, Box, Mesh, Texture, TextureLoader, Camera, Transform } from 'ogl'

// import fragment from '../shaders/base/fragment.glsl'
// import fragment from '../shaders/base/fragment.glsl?raw'
// import fragment from '../shaders/base/fragment.glsl' with { type: "text" }
import fragment from '../shaders/base/fragment.js'

// import vertex from '../shaders/base/vertex.glsl'
import vertex from '../shaders/base/vertex.js'

import image01 from "../images/01.jpg"
import image02 from "../images/02.jpg"

class App {
    private renderer: Renderer
    private gl: WebGL2RenderingContext
    private camera: any
    private geometry: Geometry
    private program: Program
    private mesh: Mesh
    private scene: Transform
    private imageTexture01: Texture
    private imageTexture02: Texture
    private cursor: { x: number; y: number }
    private sizes: { width: number; height: number }

    constructor() {
        this.cursor = {
            x: 0,
            y: 0
        }
        this.sizes = {
          width: window.innerWidth,
          height: window.innerHeight
        }

        this.createRenderer()
        // this.createImageTexture()
        this.createScene()
        this.createCamera()
        this.createMesh()
        this.addListeners()
        this.getScreenSize()
        this.onResize()
        window.requestAnimationFrame(this.update.bind(this))
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

    createScene() {
        this.scene = new Transform()
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.position.z = 5;
    }

    createMesh() {
        this.geometry = new Box(this.gl);

        this.program = new Program(this.gl, {
            vertex,
            fragment,
            uniforms: {
                modelViewMatrix: { value: new Float32Array(16) },
                projectionMatrix: { value: new Float32Array(16) },
                uTime: { value: 0 },
                uCursorX: { value: 0 },
                uCursorY: { value: 0 },
            },
        })
        
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry, 
            program: this.program 
        })

        this.mesh.setParent(this.scene)
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

    
    update(time: number) {
        window.requestAnimationFrame(this.update.bind(this))

        this.program.uniforms.uTime.value = time * 0.001
        // this.program.uniforms.uCursorX.value = this.cursor.x
        // this.program.uniforms.uCursorY.value = this.cursor.y

        // console.log(this.program.uniforms);
        
        this.renderer.render({ 
            scene: this.scene
            // camera: this.camera // Optional
        })
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

            console.log(this.cursor);
        })

        window.addEventListener("resize", this.onResize.bind(this))
    }

}

new App()