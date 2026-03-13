type AppCursor = {
  x: number
  y: number
}

type AppScreen = {
  width: number
  height: number
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "vertex.ts" {
  const value: string;
  export default value;
}
declare module "fragment.ts" {
  const value: string;
  export default value;
}

type OGLRenderingContext = (WebGL2RenderingContext | WebGLRenderingContext) & {
  renderer: Renderer;
  canvas: HTMLCanvasElement;
};