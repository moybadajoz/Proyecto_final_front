<template>
  <v-card
    height="500px"
    width="500px"
    elevation="9"
    class="d-flex flex-column align-center"
    color="yellow lighten-1"
  >
    <v-card-title>
      <h1 style="color:black">
        NotesApp
      </h1>
    </v-card-title>
    <div class="d-flex col align-content-center justify-center flex-wrap">
      <v-btn width="90%" height="60" class="mb-15" @click="login">
        Iniciar sesion
      </v-btn>
      <v-btn width="90%" height="60" @click="singup">
        Registrarse
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push('/login')
    },
    singup () {
      this.$router.push('/singup')
    }
  }
}
</script>
