export default {
  install (app) {
    const files = require.context('./', false, /[^index]\.js$/)
    files.keys().forEach(fileUrl => {
      const directive = files(fileUrl).default
      const name = fileUrl.split('/')[1].split('.')[0]
      app.directive(name, directive)
    })
  }
}
