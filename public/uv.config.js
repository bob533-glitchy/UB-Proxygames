/**
 * Upgraded Ultraviolet v3 Configuration File
 * Built for compatibility with modern bare-mux implementations.
 */

self.__uv$config = {
  prefix: '/service/',
  
  /* Upgraded: Transformed from a single string to an array layout to prevent 
     errors with modern bare-mux implementations and support fallback routes. */
  bare: [
    '/bare/',
  ],
  
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/uv/uv.handler.js',
  bundle: '/uv/uv.bundle.js',
  config: '/uv/uv.config.js',
  sw: '/uv/uv.sw.js',
};
