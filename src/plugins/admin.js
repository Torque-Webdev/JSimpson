import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const adminComponents = require.context('@/components/admin', true, /\.vue$/)

for (const file of adminComponents.keys()) {
  const componentConfig = adminComponents(file)
  const name = file
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  const componentName = upperFirst(camelCase(name))

  Vue.component(
    `Admin${componentName}`,
    componentConfig.default || componentConfig,
  )
}
