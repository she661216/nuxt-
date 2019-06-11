import Vue from 'vue'
import components from '../components/global'
import globalMixin from '../mixins/globalMixin'
import filters from '../filters'

Object.keys(components).forEach((key) => {
  Vue.component(`${key}`, components[key])
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.mixin(globalMixin)
