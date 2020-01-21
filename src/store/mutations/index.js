import feedback from './feedback'
import * as storage from '@/utils/localStorage'
import router from '../../router'
export default {
  // Error and loading mutations
  ...feedback,
  setUser: (state, { signIn, user }) => {
    const token = user ? user.token : signIn.token
    const email = user ? user.email : signIn.user.email
    state.user = {
      token,
      email
    }
    storage.setItem('user', state.user)
    if (signIn) {
      router.push(router.currentRoute.query.from || 'dashboard')
    }
  },
  unsetUser: (state) => {
    state.user = {
      email: '',
      password: ''
    }
    localStorage.removeItem('user')
    router.push('login')
  },
  setMeasurements: (state, { measurements }) => {
    state.measurements = measurements
    storage.setItem('measurements', state.measurements)
  }
}
