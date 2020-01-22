import gql from 'graphql-tag'
import apolloAction from './apollo'
import localStorageAction from './localStorage'
export default {
  // #region User actions
  authenticateUser: apolloAction({
    tag: 'authenticateUser',
    type: 'mutate',
    apolloRequest: {
      mutation: gql`
      mutation ($email: String!, $password: String!){
        signIn(email: $email,password: $password) {
            token
            user {
              email
            }
        }
    }
  ` },
    mutation: 'setUser'
  }),
  logoutUser: ({ commit }) => {
    commit('unsetUser')
  },
  initUserFromLocalStorage: localStorageAction({
    key: 'user',
    mutation: 'setUser',
    commitIf: (user) => {
      return user && !user.token
    } }),

  // #endregion

  // #region Measurements actions
  getMeasurements: apolloAction({
    tag: 'getMeasurements',
    type: 'query',
    apolloRequest: {
      query: gql`
        query {
          measurements {
            id
            measurement
            createdAt
            measuredAt
            status
          }
        }
      `
    },
    mutation: 'setMeasurements'
  }),
  initMeasurementsFromLocalStorage: localStorageAction({
    key: 'measurements',
    mutation: 'setMeasurements',
    commitIf: (measurements) => measurements.length < 1
  })
  // #endregion

}
