---
sidebar: auto
---

# 阅读笔记

::: tip 说明
1. 参考资料：[《WebGL编程指南》](https://book.douban.com/subject/25909351/) 和 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)。

2. 根据参考资料，本文主要涉及 [WebGL 1](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext)，[WebGL 2](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext) 相关内容必要时将特别指出。

3. 为方便处理，本文中的 Demo 以 Vue 组件的形式编写，通常你只需要关注 `mounted (){}`。
:::

## 第一章

### 起源

[WebGL](http://khronos.org/webgl/) 起源于 OpenGL 的特殊版本：OpenGL ES。

WebGL 1 以 OpenGL 2 为基础。

### 着色器语言

- Shading language
- GLSL


## 第二章

### 上下文

像 2D Canvas 中的 `CanvasRenderingContext2D` 那样，WebGL 提供 [WebGLRenderingContext](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext) 作为 OpenGL ES 2.0 的绘图上下文：

```js
const gl = canvas.getContext('webgl')
```

### 最短的 WebGL 程序

```vue
@playground
<template>
  <canvas width=100 height=100></canvas>
</template>

<script>
export default {
  mounted () {
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

#### 1. 习惯命名

通常使用 `gl` 来命名 `WebGLRenderingContext` 对象，这是为了将 WebGL 中的函数与 OpenGL ES 对应起来。如 `gl.clearColor()` 对应 OpenGL 中的 `glClearColor()`。

#### 2. `gl.clearColor()`

这个方法只是指定了绘图区背景色，注意不要因为 `clear` 是动词就理解错。

这个方法接收四个参数，分别对应 `r` `g` `b` `a` 四个分量，取值范围为 `[0, 1]`。


#### 3. `gl.clear()`

`gl.clear()` 是用来清空缓冲区（buffer）的。注意 WebGL 是基于多缓冲区模型的，清空绘图区域，实际上是在清空颜色缓冲区。

WebGL 中的缓冲区分为以下类型：

- 颜色缓冲区 `gl.COLOR_BUFFER_BIT`
- 深度缓冲区 `gl.DEPTH_BUFFER_BIT`
- 模板缓冲区 `gl.STENCIL_BUFFER_BIT`

如果你在控制台中打印一下，会发现缓冲区的标志 `gl.XXX_BUFFER_BIT` 的值是一个整数。如果要同时清除几种缓冲区，可以使用位运算符 `|` 来指定。

### 绘制点
