export default {
  loggedIn: (state) => {
    console.log('state', state.user.token)
    return !!state.user.token
  }
}
