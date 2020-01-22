import { apolloClient } from '@/apollo'
// A high order funciton for making Vuex actions consuming GraphQL, only works with queries and mutations
export default ({
  tag, // identifies this call for loading  and error handling purpouses
  type, // if is a mutation or a query
  apolloRequest, // object with apollo configs, without variables (those will be sent with high order function param )
  mutation // after success, commit response value with this mutation
}) => async ({ commit }, variables = {}) => {
  try {
    commit('setLoading', tag)
    const result = await apolloClient[type]({ ...apolloRequest, variables })
    commit(mutation, result.data)
  } catch (error) {
    commit('setError', { error, tag })
  } finally {
    commit('unsetLoading', tag)
  }
}
