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
          }
        `

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

### 2D Sierpinski Gasket: Triangles

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
        }
      `
      const fragmentShader = `
        precision mediump float;
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `

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

### 2D Sierpinski Gasket: Gradients

这里使用了 `varying` 变量，从顶点着色器向片元着色器传递颜色值。

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
        varying vec4 v_Color;
        void main() {
          gl_Position = a_Position;
          v_Color = vec4((a_Position.xyz + 1.0) / 2.0, 1.0);
        }
      `
      const fragmentShader = `
        precision mediump float;
        varying vec4 v_Color;
        void main() {
          gl_FragColor = v_Color;
        }
      `

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

### 3D Sierpinski Gasket: Vertices

```html
@playground
<template>
  <div>
    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
  const vertices = [
    // [0.0, 0.0, -1.0],
    // [0.0, 1.0, 0.5],
    // [-1.0, -0.5, 0.5],
    // [1.0, -0.5, 0.5]
    [0.0, 0.0, -1.0],
    [0.0, 0.9428, 0.3333],
    [-0.8165, -0.4714, 0.3333],
    [0.8165, -0.4714, 0.3333]
  ]

  export default {
    data() {
      return { numToDivide: 3 }
    },
    methods: {
      draw() {
        const gl = this.gl
        const vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)

        const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(a_Position)

        gl.clearColor(1.0, 1.0, 1.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.drawArrays(gl.LINES, 0, vertices.length)
      }
    },
    mounted() {
      const canvas = this.$refs.canvas
      const gl = canvas.getContext('webgl')
      const vertexShader = `
        attribute vec4 a_Position;
        void main() {
          gl_Position = a_Position;
        }
      `
      const fragmentShader = `
        precision mediump float;
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `

      this.gl = gl
      this.initShaderProgram(gl, vertexShader, fragmentShader)
      gl.enable(gl.DEPTH_TEST)
      gl.viewport(0, 0, canvas.width, canvas.height)
      this.draw()
    }
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

### 3D Sierpinski Gasket

```html
@playground
<template>
  <div>
    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
  const COLORS = {
    red: [1.0, 0.0, 0.0],
    green: [0.0, 1.0, 0.0],
    blue: [0.0, 0.0, 1.0],
    none: [0.0, 0.0, 0.0]
  }
  const vertices = [
    [0.0, 0.0, -1.0],
    [0.0, 0.9428, 0.3333],
    [-0.8165, -0.4714, 0.3333],
    [0.8165, -0.4714, 0.3333]
  ]

  export default {
    data() {
      return { numToDivide: 3 }
    },
    methods: {
      draw() {
        const gl = this.gl
        const [points, colors] = divideTetra(...vertices, this.numToDivide)

        const vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW)

        const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(a_Position)

        const colorBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW)

        const a_Color = gl.getAttribLocation(gl.program, 'a_Color')
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(a_Color)

        gl.clearColor(1.0, 1.0, 1.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, points.length)
      }
    },
    mounted() {
      const canvas = this.$refs.canvas
      const gl = canvas.getContext('webgl')
      const vertexShader = `
        attribute vec4 a_Position;
        attribute vec4 a_Color;
        varying vec4 v_Color;
        void main() {
          gl_Position = a_Position;
          v_Color = a_Color;
        }
      `
      const fragmentShader = `
        precision mediump float;
        varying vec4 v_Color;
        void main() {
          gl_FragColor = v_Color;
        }
      `

      this.gl = gl
      this.initShaderProgram(gl, vertexShader, fragmentShader)
      gl.enable(gl.DEPTH_TEST)
      gl.viewport(0, 0, canvas.width, canvas.height)
      this.draw()
    }
  }

  function midpoint([x1, y1, z1 = 0], [x2, y2, z2 = 0]) {
    return [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2]
  }

  function divideTetra(a, b, c, d, count = 5, points = [], colors = []) {
    if (count === 0) {
      points.push(...[a, c, b])
      colors.push(COLORS.red, COLORS.red, COLORS.red)

      points.push(...[a, c, d])
      colors.push(COLORS.green, COLORS.green, COLORS.green)

      points.push(...[a, b, d])
      colors.push(COLORS.blue, COLORS.blue, COLORS.blue)

      points.push(...[b, c, d])
      colors.push(COLORS.none, COLORS.none, COLORS.none)

      return [points, colors]
    }
    const ab = midpoint(a, b)
    const ac = midpoint(a, c)
    const ad = midpoint(a, d)
    const bc = midpoint(b, c)
    const bd = midpoint(b, d)
    const cd = midpoint(c, d)

    count = count - 1

    divideTetra(a, ab, ac, ad, count, points, colors)
    divideTetra(ab, b, bc, bd, count, points, colors)
    divideTetra(ac, bc, c, cd, count, points, colors)
    divideTetra(ad, bd, cd, d, count, points, colors)

    return [points, colors]
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
