import * as webglUtils from './webgl-utils'
import clipboardIcon from './assets/clipboard.svg'
import './styles/index.css'

const clipBtn = `<button class="clip-btn" data-clipboard-snippet>
<img class="clippy" width="13" src="${clipboardIcon}" alt="Copy to clipboard">
</button>`

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  if (typeof window !== 'undefined' && window) {
    Object.assign(window, webglUtils)
  }

  Vue.mixin({
    destroyed() {
      const elem = this.$el
      const canvas = elem instanceof HTMLCanvasElement ? elem : elem.querySelector('canvas')
      if (!canvas) {
        return
      }
      const gl = canvas.getContext('webgl')

      // SEE https://my.oschina.net/codingDog/blog/1839100
      if (gl.program) {
        if (gl.getParameter(gl.CURRENT_PROGRAM) === gl.program) {
          gl.useProgram(null)
        }
        gl.deleteProgram(gl.program)
        gl.program = null
      }
    },
    mounted() {
      // if (this.$el instanceof HTMLElement === false) return
      // if (this.$el.classList.contains('page') === false) return

      // const codeBlocks = this.$el.querySelectorAll('div[class*="language-"]')
      // const div = document.createElement('div')
      // div.innerHTML = clipBtn
      // const btn = div.children[0]

      // for (let block of codeBlocks) {
      //   block.appendChild(btn.cloneNode(true))
      //   btn.onclick = () => {
      //     copy(this.$el)
      //   }
      // }
    }
  })
}
