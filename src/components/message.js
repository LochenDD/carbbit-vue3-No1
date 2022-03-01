import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

let timer = null
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-box')
document.body.appendChild(div)

export default function message (type, text, delay = 2000) {
  const vNode = createVNode(XtxMessage, { type, text, delay })
  render(vNode, div)

  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, delay)
}
