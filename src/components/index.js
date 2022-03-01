// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'

export default {
  install (app) {
    const files = require.context('./', false, /\.vue$/)
    files.keys().forEach(i => {
      const component = files(i).default
      app.component(component.name, component)
    })

    // app.component('XtxSkeleton', XtxSkeleton)
    // app.component('XtxCarousel', XtxCarousel)
    // app.component('XtxMore', XtxMore)
  }
}
