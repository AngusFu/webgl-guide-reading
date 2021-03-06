# 第三章 绘制和变换三角形

## 绘制多个点

可以通过缓冲区对象，一次性向着色器传入多个数据。

```html
@playground
<template>
  <div>
    <select v-if="shapes.length" v-model="drawingType">
      <option v-for="shape in shapes" :value="shape[1]">{{shape[0]}}</option>
    </select>
    <div style="height: 10px;"></div>
    <canvas width="100" height="100" ref="canvas"></canvas>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        shapes: [],
        drawingType: null,
        vertices: new Float32Array([
          -0.5,
          +0.5,
          -0.5,
          -0.5,
          +0.5,
          +0.5,
          +0.5,
          -0.5
        ])
      }
    },
    mounted() {
      const gl = this.$refs.canvas.getContext('webgl')
      const vertexShader = `
        attribute vec4 a_Position;
        void main() {
          gl_Position = a_Position;
          gl_PointSize = 6.0;
        }
      `
      const fragmentShader = `
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `

      this.initShaderProgram(gl, vertexShader, fragmentShader)

      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      if (a_Position < 0) {
        console.error(`获取 a_Position 位置错误`)
        return
      }

      // 创建缓冲区对象
      const vertexBuffer = gl.createBuffer()
      if (vertexBuffer == null) {
        console.error('创建缓冲区对象失败')
        return
      }

      // 绑定 buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      // 写入数据
      gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)
      // 将缓冲区对象分配给 a_Position
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
      // 连接变量与缓冲区
      gl.enableVertexAttribArray(a_Position)

      this.gl = gl
      this.shapes = [
        ['gl.POINTS', gl.POINTS],
        ['gl.LINES', gl.LINES],
        ['gl.LINE_STRIP', gl.LINE_STRIP],
        ['gl.LINE_LOOP', gl.LINE_LOOP],
        ['gl.TRIANGLES', gl.TRIANGLES],
        ['gl.TRIANGLE_STRIP', gl.TRIANGLE_STRIP],
        ['gl.TRIANGLE_FAN', gl.TRIANGLE_FAN]
      ]
      this.drawingType = gl.POINTS
    },
    watch: {
      drawingType(newVal) {
        const { gl } = this
        // 绘制
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(newVal, 0, this.vertices.length / 2)
      }
    }
  }
</script>
```
