---
sidebar: auto
---

# 《交互式计算机图形学》练习

::: tip 说明
用于学习《交互式计算机图形学》练习。
:::

## 第二章

### 2D Sierpinski Gasket: Dots

```html
@playground
<template>
  <canvas width="300" height="300"></canvas>
</template>

<script>
  export default {
    methods: {
      init() {
        const gl = this.$el.getContext('webgl')
        const vertexShader = `
          attribute vec4 a_Position;
          void main() {
            gl_Position = a_Position;
            gl_PointSize = 1.0;
          }
        `
        const fragmentShader = `
        precision mediump float;
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }`

        this.gl = gl
        this.initShaderProgram(gl, vertexShader, fragmentShader)
      },

      draw(points) {
        const gl = this.gl
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
    },

    mounted() {
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

      this.init()
      this.draw(points)
    }
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
```

### 2D Sierpinski Gasket: Filled

```html
@playground
<template>
  <div>
    <canvas ref="canvas" width="300" height="300"></canvas>
    <input
      type="range"
      max="7"
      min="2"
      v-model="numToDivide"
      @change="onChange"
    />
    {{ numToDivide }}
  </div>
</template>

<script>
  const vertices = [[-1.0, -1.0, 0], [+0.0, +1.0, 0], [+1.0, -1.0, 0]]

  export default {
    data() {
      return { numToDivide: 5 }
    },
    methods: {
      draw() {
        const gl = this.gl
        const vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

        const points = divideTriangle(...vertices, this.numToDivide, [])
        gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW)

        const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(a_Position)

        gl.clearColor(1.0, 1.0, 1.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, points.length)
      },
      onChange() {
        this.draw()
      }
    },
    mounted() {
      const gl = this.$refs.canvas.getContext('webgl')
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

      this.gl = gl
      this.initShaderProgram(gl, vertexShader, fragmentShader)
      this.draw()
    }
  }

  function midpoint([x1, y1, z1 = 0], [x2, y2, z2 = 0]) {
    return [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2]
  }

  function divideTriangle(a, b, c, count = 5, points = []) {
    if (count === 0) {
      points.push(...[a, b, c])
      return points
    }

    const ab = midpoint(a, b)
    const bc = midpoint(b, c)
    const ca = midpoint(c, a)
    count = count - 1

    divideTriangle(a, ab, ca, count, points)
    divideTriangle(b, bc, ab, count, points)
    divideTriangle(c, ca, bc, count, points)
    return points
  }

  function flatten(arrayOfArray) {
    return new Float32Array(
      arrayOfArray.reduce((acc, arr) => {
        return [...acc, ...arr]
      })
    )
  }
</script>
```

### Turtle Graphics

```html
@playground
<template>
  <canvas width="200" height="200"></canvas>
</template>

<script>
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
    }
  `

  export default {
    name: 'TurtleGraphics',
    data() {
      return {
        vertexShader,
        fragmentShader,
        gl: null,
        a_Position: null,
        points: [],
        angle: 0,
        x: 0,
        y: 0
      }
    },

    methods: {
      init(x, y, theta) {
        this.x = x
        this.y = y
        this.theta = theta
      },
      forward(distance) {
        // TODO
      },
      left(angle) {},
      right(angle) {},
      pen(up_down) {},

      getGLContext() {
        return this.$el
          ? this.gl || (this.gl = this.$el.getContext('webgl'))
          : null
      },

      initProgram() {
        const gl = this.getGLContext()
        initShaderProgram(gl, this.vertexShader, this.fragmentShader)

        const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(a_Position)
        this.a_Position = a_Position
      },

      bufferData(data) {
        const gl = this.getGLContext()
        const vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW)
      }
    }
  }

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
```
