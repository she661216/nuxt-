export default function ({store, req, route}) {
  // If nuxt generate, pass this middleware
  if (process.server && !req) return
  store.commit('SET_LOADING_NUM', 0)
}
