<template>
    <div class="login-root">
      <div class="login-container">
        <h1>Faça login para continuar</h1>
        <b-alert variant="danger" :show="!!errors['authenticateUser']">
         {{handleError()}}
        </b-alert>
        <b-form @submit.prevent="handleLogin" class="form">
          <b-form-group
            id="input-group-email"
            label="Email:"
            label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="credentials.email"
              :state="submitted && formErrors.email ? false : null"
              type="text"

              placeholder="Seu email">
              </b-form-input>
              <b-form-invalid-feedback :state="submitted && formErrors.email ? false : null">
                {{formErrors.email}}
              </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-password"
            label="Senha:"
            label-for="input-password">
            <b-form-input
              id="input-password"
              v-model="credentials.password"
              :state="submitted && formErrors.password ? false : null"
              type="password"

              placeholder="Sshhhhhh">
              </b-form-input>
              <b-form-invalid-feedback :state="submitted && formErrors.password ? false : null">
                {{formErrors.password}}
              </b-form-invalid-feedback>
          </b-form-group>

      <b-button type="submit" class="btn" :disabled="isLoading">{{isLoading ? 'Aguarde...' : 'Login'}}</b-button>
    </b-form>
      </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      submitted: false
    }
  },
  methods: {
    ...mapActions(['authenticateUser']),
    handleLogin () {
      this.submitted = true
      const { formErrors } = this
      if (!formErrors.email && !formErrors.password) {
        this.authenticateUser(this.credentials)
      }
    },
    handleError () {
      const error = this.errors['authenticateUser']
      if (error) {
        if (error.graphQLErrors) {
          return error.graphQLErrors[0].message
        } else if (error.networkError) {
          return 'Ops! Estamos com problemas de conexão, tente novamente'
        } else {
          return 'Essa não! Ocorreu um erro inesperado'
        }
      }
    }
  },
  computed: {
    ...mapState(['errors', 'loading']),
    isLoading () {
      return this.loading.indexOf('authenticateUser') > -1
    },
    formErrors () {
      const { email, password } = this.credentials
      const errors = {}
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!email) {
        errors.email = 'Ops! Você esqueceu do seu email'
      } else if (!regexEmail.test(email)) {
        errors.email = 'Email inválido'
      }

      if (!password) {
        errors.password = 'Essa não! Você esqueceu da sua senha'
      } else if (password.length < 7) {
        errors.password = 'A senha deve ter mais de 6 caracteres :)'
      }
      return errors
    }
  }
}
</script>
<style>

.login-root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 74px);
  padding: 20px;
}

.form{
  text-align: left;
  max-width: 100%;
}

.form-control{
  border-radius: 0.2rem;
}
.form-control:focus{
  border-color: #FF0E88;
  box-shadow: 0 0 0 0.2rem rgba(255,14,136, 0.25);
}

.btn{
  width: 100%;
}
@media (max-width: 600px) {
  .form {
    max-width: 100%;
  }
}

</style>
