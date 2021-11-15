import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const modalsComponents = require.context(
  '@/components/admin/modals',
  true,
  /\.vue$/,
)

for (const file of modalsComponents.keys()) {
  const componentConfig = modalsComponents(file)
  const name = file
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  const componentName = upperFirst(camelCase(name))

  Vue.component(
    `Modal${componentName}`,
    componentConfig.default || componentConfig,
  )
}
