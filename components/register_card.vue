<template>
  <div>
    <v-card
      color="purple lighten-3"
      width="500"
      height="500"
      elevation="9"
      class="d-flex align-content-space-between flex-column align-center flex-wrap"
    >
      <v-card-title>
        <h1>
          Registrarse
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="frmSingUp" v-model="valid" lazy-validation>
          <v-text-field v-model="name" label="Nombre de usuario" :rules="nameRules" required />
          <v-text-field v-model="email" label="Email" :rules="emailRules" required />
          <v-text-field v-model="password" label="Contraseña" type="password" :rules="passRules" required />
          <v-text-field v-model="passConfirm" label="Confirmar Contraseña" type="password" :rules="[v => (passConfirm === password) || 'Las contraseñas no coinciden']" required />
        </v-form>
        Ya tienes cuenta?  <a href="\login">Incia sesion</a>
      </v-card-text>
      <v-card-actions class="d-flex col align-content-end justify-center flex-wrap">
        <v-btn block :disabled="!valid" class="colorBtn" @click="register">
          Registrar
          <v-icon dense style="padding-left: 10px;">
            mdi-account-plus
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
    valid: false,
    name: '',
    email: '',
    password: '',
    passConfirm: '',
    nameRules: [
      v => !!v || 'El nombre no puede estar vacio'
    ],
    emailRules: [
      v => !!v || 'El email no puede estar vacio',
      v => /.+@.+\..+/.test(v) || 'El email debe ser valido'
    ],
    passRules: [
      v => !!v || 'La contraseña no puede estar vacia',
      v => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
      v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){8,32}$/.test(v) || 'La contraseña debe contener una mayuscula, una minuscula, un caracter especial y un numero'
    ],
    resDialog: false,
    resText: ''

  }),

  methods: {
    async register () {
      if (this.email.length === 0 || this.password.length === 0 || this.name.length === 0 || this.passConfirm.length === 0) {
        this.resText = 'Los espacios no pueden estar vacios'
        this.resDialog = true
        setTimeout(() => {
          this.resDialog = false
        }, 1500)
        return 0
      }
      if (this.$refs.frmSingUp.validate()) {
        const sendData = {
          name: this.name,
          email: this.email,
          password: this.password,
          passConfirm: this.passConfirm
        }
        const config = {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          }
        }
        await this.$axios.post('/user', sendData, config)
          .then((res) => {
            if (res.data.msg === 'Success') {
              this.$router.push('/login')
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
