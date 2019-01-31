/**
 * original from:
 * https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample3/webgl-demo.js
 */

export function loadShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    console.error(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    )
    return null
  }

  return shader
}

export function initShaderProgram(gl, vSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const program = gl.createProgram()

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        program
      )}`
    )
    gl.deleteProgram(program)
    return null
  }

  gl.useProgram(program)
  gl.program = program
  return program
}
