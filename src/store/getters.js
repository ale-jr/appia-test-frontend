export default {
  loggedIn: (state) => {
    return !!state.user.token
  }
}
