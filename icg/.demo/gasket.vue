@playground
<template>
  <canvas width="200" height="200"></canvas>
</template>

<script>
export default { mounted }

function mounted() {
  const vertices = [[-1.0, -1.0], [+0.0, +1.0], [+1.0, -1.0]]
  const u = midpoint(vertices[0], vertices[1])
  const v = midpoint(vertices[0], vertices[2])
  const p = midpoint(u, v)

  let lastPoint = midpoint(u, v)
  const points = [
    lastPoint,
    ...Array.from({ length: 5000 }, () => {
      lastPoint = midpoint(lastPoint, vertices[(Math.random() * 3) | 0])
      return lastPoint
    })
  ]

  const gl = this.$el.getContext('webgl')
  const vertexShader = `
      attribute vec4 a_Position;
      void main() {
        gl_Position = a_Position;
        gl_PointSize = 2.0;
      }
    `
  const fragmentShader = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`

  initShaderProgram(gl, vertexShader, fragmentShader)

  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW)

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_Position)

  gl.clearColor(1.0, 1.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, points.length)
}

function midpoint([x1, y1, z1 = 0], [x2, y2, z2 = 0]) {
  return [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2]
}

function flatten(arrayOfArray) {
  return new Float32Array(
    arrayOfArray.reduce((acc, arr) => {
      return [...acc, ...arr]
    })
  )
}
</script>
