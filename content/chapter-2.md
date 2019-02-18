# 第二章 基础入门

## 上下文

像 2D Canvas 中的 `CanvasRenderingContext2D` 那样，WebGL 提供 [WebGLRenderingContext](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext) 作为 OpenGL ES 2.0 的绘图上下文：

```js
const gl = canvas.getContext('webgl')
```

## 最短的 WebGL 程序

```html
@playground
<template>
  <canvas width="100" height="100"></canvas>
</template>

<script>
  export default {
    mounted() {
      // 获取绘图上下文
      const gl = this.$el.getContext('webgl')
      // 设置背景色
      gl.clearColor(0.0, 0.5, 0.5, 1.0)
      // 使用背景色清空 canvas
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
  }
</script>
```

以上，注意以下几点 ——

### 1. 习惯命名

通常使用 `gl` 来命名 `WebGLRenderingContext` 对象，这是为了将 WebGL 中的函数与 OpenGL ES 对应起来。如 `gl.clearColor()` 对应 OpenGL 中的 `glClearColor()`。

### 2. `gl.clearColor()`

这个方法只是指定了绘图区背景色，注意不要因为 `clear` 是动词就理解错。

这个方法接收四个参数，分别对应 `r` `g` `b` `a` 四个分量，取值范围为 `[0, 1]`。

### 3. `gl.clear()`

`gl.clear()` 是用来清空缓冲区（buffer）的。注意 WebGL 是基于多缓冲区模型的，清空绘图区域，实际上是在清空颜色缓冲区。

WebGL 中的缓冲区分为以下类型：

- 颜色缓冲区 `gl.COLOR_BUFFER_BIT`
- 深度缓冲区 `gl.DEPTH_BUFFER_BIT`
- 模板缓冲区 `gl.STENCIL_BUFFER_BIT`

如果你在控制台中打印一下，会发现缓冲区的标志 `gl.XXX_BUFFER_BIT` 的值是一个整数。如果要同时清除几种缓冲区，可以使用位运算符 `|` 来指定。

## 绘制点

绘制步骤如下。

### 1. 创建着色器对象

WebGL 中的着色器分为两类，**顶点着色器**（Vertex Shader）和 **片元着色器**（Fragment Shader）。

顶点着色器用于描述顶点特性，如位置、颜色等。

片元着色器是用于进行逐片元（Fragment）处理过程的程序。可以将片元理解为像素。

着色器程序在 JavaScript 中是使用字符串编写的。在使用之前，需要对其进行编译。下面是本篇使用到的加载着色器程序的函数：

```js
function loadShader(gl, type, source) {
  // type 代表着色器类型，可选值为 gl.VERTEX_SHADER、gl.FRAGMENT_SHADER
  const shader = gl.createShader(type)
  // 加载着色器源码
  gl.shaderSource(shader, source)
  // 编译
  gl.compileShader(shader)

  // 获取编译结果
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    console.error(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    )
    return null
  }

  return shader
}
```

### 2. 初始化着色器程序

调用 `gl.createProgram()` 创建 program 对象，并将创建好的着色器对象附着到 program 上，然后将 program 链接到绘图上下文。下面是本篇使用到的初始化着色器函数：

```js
function initShaderProgram(gl, vSource, fSource) {
  // 创建着色器对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource)

  // 创建空 program 对象
  const program = gl.createProgram()

  // 附着着色器对象
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  // 链接 program
  gl.linkProgram(program)

  // 获取链接状态
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        program
      )}`
    )
    gl.deleteProgram(program)
    return null
  }

  // 启动 program
  gl.useProgram(program)
  gl.program = program
  return program
}
```

### 3. 绘制

```html
@playground
<template>
  <canvas width="100" height="100"></canvas>
</template>

<script>
  export default {
    mounted() {
      const gl = this.$el.getContext('webgl')
      const vertexShader = `void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
      }`
      const fragmentShader = `void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`

      this.initShaderProgram(gl, vertexShader, fragmentShader)

      // 设置背景色
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      // 使用背景色清空 canvas
      gl.clear(gl.COLOR_BUFFER_BIT)

      // 绘制
      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }
</script>
```

## 顶点着色器

上面的程序中使用到的顶点着色器代码如下：

```glsl
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 10.0;
}
```

| 变量名         | 类型    | 默认值   | 说明     |
| -------------- | ------- | -------- | -------- |
| `gl_Position`  | `vec4`  | 无，必传 | 顶点位置 |
| `gl_PointSize` | `float` | `1.0`    | 点的尺寸 |

注意：

- `vec4` 类型是由 4 个浮点数组成的矢量。
- 齐次坐标的概念 ——
  - [百度百科](https://baike.baidu.com/item/%E9%BD%90%E6%AC%A1%E5%9D%90%E6%A0%87)
  - [齐次坐标系入门级思考](https://oncemore.wang/blog/homogeneous/)
  - [关于齐次坐标的理解](https://blog.csdn.net/JANESTAR/article/details/44244849)
  - [Youtube 视频](https://www.youtube.com/results?search_query=Homogeneous+Coordinates)

## 片元着色器

顶点着色器控制点的位置、颜色，片元着色器控制点的颜色。

```glsl
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

`gl_FragColor` 的值也是一个矢量，代表 RGBA 颜色值。

## `gl.drawArrays`

我们在绘制点时，使用了 `gl.drawArrays()` 方法：

```js
gl.drawArrays(gl.POINTS, 0, 1)
```

这个方法可以用来绘制各种图形，其使用方式为：`gl.drawArrays(mode, first, count)`。

- `mode` 指定绘制方式，可以接收以下常量 （参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/drawArrays)）

| 值                  | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `gl.POINTS`         | 绘制一系列点                                                 |
| `gl.LINES`          | 绘制一系列单独线段。每两个点作为端点，线段之间不连接         |
| `gl.LINE_STRIP`     | 绘制一系列线段，上一点连接下一点                             |
| `gl.LINE_LOOP`      | 绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连 |
| `gl.TRIANGLES`      | 绘制一系列三角形。每三个点作为顶点                           |
| `gl.TRIANGLE_STRIP` | 绘制一个三角带                                               |
| `gl.TRIANGLE_FAN`   | 绘制一个三角扇                                               |

- `first` 指定从哪个点开始绘制
- `count` 指定绘制用到的点的数量

## WebGL 坐标系

暂时可以认为 WebGL 中的坐标系是“右手坐标系”。需要注意与 2D context 的区别。

<img src="https://ws2.sinaimg.cn/large/0069RVTdly1fv8cc6m6gwj30q80pkwef.jpg" style="max-width: 400px" />

## 使用变量

### attribute 变量

传输与顶点相关的数据。**只有顶点着色器中可以使用。**

使用步骤：

1. 在顶点着色器中声明变量，并将其赋值给 `gl_Position`
2. 在 JS 中获取变量存储的位置：`gl.getAttribLocation(program, varName)`
3. 在 JS 中向变量传输数据：`gl.vertexAttrib3f(pos, x, y, z)`

```html
@playground
<template>
  <canvas width="100" height="100"></canvas>
</template>

<script>
  export default {
    mounted() {
      const gl = this.$el.getContext('webgl')
      const vertexShader = `
        // 声明变量
        attribute vec4 a_Position;
        void main() {
          // 赋值给 gl_Position
          gl_Position = a_Position;
          gl_PointSize = 10.0;
        }
      `
      const fragmentShader = `void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`

      this.initShaderProgram(gl, vertexShader, fragmentShader)

      // 获取变量存储位置
      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

      // 若 a_Position 为 -1，则说明获取的变量不存在
      // 或者变量名以 gl_ 或 webgl_ 开头
      if (a_Position < 0) {
        console.error(`获取 a_Position 位置错误`)
        return
      }

      // 传输顶点数据
      gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)

      // 设置背景色
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      // 使用背景色清空 canvas
      gl.clear(gl.COLOR_BUFFER_BIT)
      // 绘制
      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }
</script>
```

`gl.vertexAttrib...` 方法分为两大类：

1. `gl.vertexAttrib${n}f`，n = 1, 2, 3, 4
2. `gl.vertexAttrib${n}fv`，n = 1, 2, 3, 4

使用如下：

1. `gl.vertexAttrib4f(program, 0.0, 0.0, 0.0, 1.0)`
2. `gl.vertexAttrib4fv(program, new Float32Array([0.0, 0.0, 0.0, 1.0]))`

```html
@playground
<template>
  <canvas width="100" height="100"></canvas>
</template>

<script>
  export default {
    mounted() {
      const gl = this.$el.getContext('webgl')
      const vertexShader = `
        attribute vec4 a_Position;
        attribute float a_PointSize;
        void main() {
          gl_Position = a_Position;
          gl_PointSize = a_PointSize;
        }
      `
      const fragmentShader = `void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`

      this.initShaderProgram(gl, vertexShader, fragmentShader)

      const getLocation = function(name) {
        const location = gl.getAttribLocation(gl.program, name)
        if (location < 0) {
          throw `获取 ${name} 位置错误`
        }
        return location
      }

      const a_PointSize = getLocation('a_PointSize')
      gl.vertexAttrib1f(a_PointSize, 18.0)

      const a_Position = getLocation('a_Position')
      gl.vertexAttrib4fv(a_Position, new Float32Array([0.0, 0.0, 0.0, 1.0]))

      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }
</script>
```

下面这个 Demo 会根据鼠标点击位置绘制点 ——

```html
@playground
<template>
  <canvas width="100" height="100" @click="handleClick"></canvas>
</template>

<script>
  export default {
    mounted() {
      const gl = this.$el.getContext('webgl')
      const vertexShader = `
        attribute vec4 a_Position;
        void main() {
          gl_Position = a_Position;
          gl_PointSize = 6.0;
        }
      `
      const fragmentShader = `void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`

      this.initShaderProgram(gl, vertexShader, fragmentShader)
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      if (a_Position < 0) {
        console.error(`获取 a_Position 位置错误`)
        return
      }

      this.gl = gl
      this.a_Position = a_Position
    },

    methods: {
      handleClick(event) {
        if (this.gl) {
          const { toWebGLCord } = this
          this.points = this.points || []
          this.points.push(toWebGLCord(event))
          this.drawPoints()
        }
      },

      drawPoints() {
        const { gl, a_Position, points } = this
        gl.clear(gl.COLOR_BUFFER_BIT)

        for (let { x, y } of points) {
          gl.vertexAttrib2f(a_Position, x, y)
          gl.drawArrays(gl.POINTS, 0, 1)
        }
      },

      toWebGLCord({ clientX, clientY }) {
        const { width, height, left, top } = this.$el.getBoundingClientRect()
        return {
          x: -(left + width / 2 - clientX) / (width / 2),
          y: (top + height / 2 - clientY) / (height / 2)
        }
      }
    }
  }
</script>
```

### uniform 变量

传输对所有顶点都相同的（或与顶点无关的）数据。

下面这个 Demo 展示了如何对不同的点显示不同的颜色 ——

```html {17,18,34,61}
@playground
<template>
  <canvas width="100" height="100" @click="handleClick"></canvas>
</template>

<script>
  export default {
    mounted() {
      const gl = this.$el.getContext('webgl')
      const vertexShader = `
      attribute vec4 a_Position;
      void main() {
        gl_Position = a_Position;
        gl_PointSize = 6.0;
      }
    `
      const fragmentShader = `
        precision mediump float;
        uniform vec4 u_FragColor;
        void main() {
          gl_FragColor = u_FragColor;
        }
      `

      this.initShaderProgram(gl, vertexShader, fragmentShader)
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      if (a_Position < 0) {
        console.error(`获取 a_Position 位置错误`)
        return
      }

      const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
      if (u_FragColor == null) {
        console.error(`获取 u_FragColor 位置错误`)
        return
      }

      this.gl = gl
      this.a_Position = a_Position
      this.u_FragColor = u_FragColor
    },

    methods: {
      handleClick(event) {
        if (this.gl) {
          const { toWebGLCord } = this
          this.points = this.points || []
          this.points.push(toWebGLCord(event))
          this.drawPoints()
        }
      },

      drawPoints() {
        const { gl, a_Position, u_FragColor, points } = this
        gl.clear(gl.COLOR_BUFFER_BIT)

        for (let { x, y } of points) {
          gl.vertexAttrib2f(a_Position, x, y)
          gl.uniform4f(
            u_FragColor,
            Math.abs(x),
            Math.abs(y),
            Math.abs(x - y),
            1
          )
          gl.drawArrays(gl.POINTS, 0, 1)
        }
      },

      toWebGLCord({ clientX, clientY }) {
        const { width, height, left, top } = this.$el.getBoundingClientRect()
        return {
          x: -(left + width / 2 - clientX) / (width / 2),
          y: (top + height / 2 - clientY) / (height / 2)
        }
      }
    }
  }
</script>
```

首先也是要声明变量 ——

```glsl
precision mediump float;
uniform vec4 u_FragColor;
```

注意第一行的**精度限定词**。

接下来的操作与 attribute 变量类似：

```js
const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
// ...
gl.uniform4f(gl.program, ...)
```

::: warning 注意
调用 `gl.getUniformLocation` 如果获取失败，返回的结果不再是 -1， 而是 null。
:::

## 其他参考

- [3D 基本理论](https://developer.mozilla.org/zh-CN/docs/Games/Techniques/3D_on_the_web/Basic_theory)
- [WebGL 技术储备指南](http://taobaofed.org/blog/2015/12/21/webgl-handbook/)
  参考资料
- [webglfundamentals](https://webglfundamentals.org/webgl/lessons/zh_cn/)
- [webgl2fundamentals](https://webgl2fundamentals.org/)
