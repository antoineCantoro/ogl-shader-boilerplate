import glsl from 'bun-plugin-glsl';
import index from './src/index.html';

console.log("Hello via Bun!");

Bun.plugin(glsl());

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
  }
});

console.log(`Listening on ${server.url}`);