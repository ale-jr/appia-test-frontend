import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import store from '../store'

Vue.use(VueApollo)

export const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
  // with this http request middleware, set the auth token in all gql requests from vuex user state
  request: (operation) => {
    const { token } = store.state.user
    operation.setContext({
      headers: {
        token
      }
    })
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
