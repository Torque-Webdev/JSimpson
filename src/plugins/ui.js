import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const uiComponents = require.context('@/components/admin/ui', true, /\.vue$/)

for (const file of uiComponents.keys()) {
  const componentConfig = uiComponents(file)
  const name = file
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  const componentName = upperFirst(camelCase(name))

  Vue.component(
    `Ui${componentName}`,
    componentConfig.default || componentConfig,
  )
}
