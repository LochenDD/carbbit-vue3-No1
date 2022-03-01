export default {
  mounted (el, { value }) {
    const observer = new IntersectionObserver(([{ isIntersecting }], observer) => {
      if (isIntersecting) {
        observer.unobserve(el)
        el.src = value
        el.onerror = function () {
          el.src = require('@/assets/images/200.png')
        }
      }
    }, {
      threshold: 0
    })
    observer.observe(el)
  }
}
