<template>
<div>
  <b-navbar toggleable="lg" class="navbar-appia">
    <router-link to="/"><img src="logo.png" class="brand-img"/></router-link>

    <b-navbar-toggle target="nav-collapse" class="collapse-appia"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right v-if="loggedIn">
             <b-nav-item href="#" @click.prevent="logoutUser">Sair</b-nav-item>
        </b-nav-item>
        <b-nav-item right v-else>
             <router-link to="/login"><b-nav-item>Login</b-nav-item></router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['logoutUser'])
  },
  computed: {
    ...mapGetters(['loggedIn'])
  }
}
</script>

<style scoped>
.navbar-appia{
   border-bottom: solid 2px #FF0E88
}
.collapse-appia{
    outline: 0;
    border: 0;
}
.brand-img{
    height: 40px
}
</style>
