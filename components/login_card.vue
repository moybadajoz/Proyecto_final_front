<template>
  <div>
    <v-card shaped color="#555" width="500" elevation="3">
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-form ref="frmLogin" v-model="valid" lazy-validation>
          <v-text-field v-model="email" label="Email" :rules="emailRules" required />
          <v-text-field v-model="password" label="Password" type="password" :rules="passRules" required />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block :disabled="!valid" class="colorBtn" @click="login">
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
        await this.$auth.loginWith('local', {
          data: sendData
        }).then((res) => {
          if (res.data.msg === 'Success') {
            this.$router.push('/dashboard')
          } else {
            this.resText = res.data.alert
            this.resDialog = true
            setTimeout(() => {
              this.resDialog = false
            }, 1500)
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {
        alert('Algo anda Mal')
      }
    }
  }
}
</script>
