<template>
  <div>
    <v-card
      color="pink lighten-3"
      width="500"
      height="500"
      elevation="9"
      class="d-flex align-content-space-between flex-column align-center flex-wrap"
    >
      <v-card-title>
        <h1>
          Login
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="frmLogin" v-model="valid" lazy-validation>
          <v-text-field v-model="email" label="Email" :rules="emailRules" required />
          <v-text-field v-model="password" label="Password" type="password" :rules="passRules" required />
        </v-form>
        No tienes cuenta?  <a href="\singup">Crear una cuenta</a>
      </v-card-text>
      <v-card-actions class="d-flex col align-content-end justify-center flex-wrap">
        <v-btn width="100%" block :disabled="!valid" class="colorBtn" @click="login">
          Ingresar
          <v-icon dense style="padding-left: 10px;">
            mdi-login
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="resDialog"
      max-width="300"
      persistent
    >
      <v-card style="background-color: #777">
        <v-card-title class="text-h4">
          Alerta
        </v-card-title>
        <v-card-text class="text-h6">
          {{ resText }}
        </v-card-text>
        <v-card-actions />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'Email es requerido',
      v => /.+@.+\..+/.test(v) || 'El email debe ser valido'
    ],
    password: '',
    passRules: [
      v => !!v || 'Contraseña es requerida'
    ],
    resDialog: false,
    resText: ''

  }),

  methods: {
    async login () {
      if (this.email.length === 0 && this.password.length === 0) {
        return
      }
      if (this.$refs.frmLogin.validate()) {
        const sendData = {
          email: this.email,
          password: this.password
        }
        const config = {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          }
        }
        await this.$axios.post('/login', sendData, config)
          .then((res) => {
            if (res.data.msg === 'Success') {
              this.$router.push('/dashboard')
            } else {
              this.resText = res.data.error
              this.resDialog = true
              setTimeout(() => {
                this.resDialog = false
              }, 1500)
            }
          }).catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        alert('Algo anda Mal')
      }
    }
  }
}
</script>
