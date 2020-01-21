export default {
  unsetUser: (state) => {
    state.user = {}
  },
  setLoading: (state, tag) => {
    if (state.loading.indexOf(tag) < 0) { state.loading.push(tag) }
  },
  unsetLoading: (state, tag) => {
    const index = state.loading.indexOf(tag)
    if (index > -1) { state.loading.splice(index, 1) }
  },
  setError: (state, { error, tag }) => {
    state.errors[tag] = error
    // console.log('error', error.graphQLErrors)
    // console.log('network', error.networkError)
  },
  unsetError: (state, tag) => {
    delete state.errors[tag]
  }
}
