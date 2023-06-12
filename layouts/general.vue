<template>
  <v-app>
    <v-card
      class="overflow-hidden"
      color="blue lighten-3"
    >
      <v-app-bar
        color="blue darken-4"
        width="100%"
        elevation="9"
      >
        <v-app-bar-title>
          <h1 disabled>
            NoteApp
          </h1>
        </v-app-bar-title>
        <v-spacer />
        <v-btn icon x-large @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn icon x-large @click="perfilDialog=true">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text style="min-height: 900px;">
        <Nuxt />
      </v-card-text>
      <v-footer padless height="45px">
        <v-col
          class="text-center"
          width="100%"
        >
          Made by Moises Badajoz
        </v-col>
      </v-footer>
    </v-card>
    <div>
      <v-dialog
        v-model="perfilDialog"
        persistent
        width="400px"
        height="200px"
      >
        <v-card>
          <v-card-title>
            Actualizar perfil
          </v-card-title>
          <v-card-text>
            <v-form ref="frmUpdate" v-model="valid" lazy-validation>
              <v-text-field v-model="name" :value="name" label="Nombre de usuario" :rules="nameRules" required />
              <v-text-field v-model="email" :value="email" label="Email" :rules="emailRules" required />
              <div class="pt-3 subtitle-1" style="color: #fff">
                Actualizar contraseña
              </div>
              <v-text-field v-model="password" label="Contraseña" type="password" :rules="passRules" />
              <v-text-field v-model="passConfirm" label="Confirmar Contraseña" type="password" :rules="[v => (passConfirm === password) || 'Las contraseñas no coinciden']" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-trash-can
                  </v-icon>
                </v-btn>
              </template>
              <v-card light>
                <v-card-title class="title">
                  Eliminar usuario
                </v-card-title>
                <v-card-text>
                  Esta accion no se podra deshacer
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="warning">
                    Cancelar
                  </v-btn>
                  <v-btn color="error" @click="eliminar()">
                    Eliminar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <v-spacer />
            <v-btn
              color="warning"
              @click="perfilDialog=false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="success"
              @click="guardar()"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Dialogo de alerta-->
      <div>
        <v-row justify="center">
          <v-dialog
            v-model="alertDialog"
            persistent
            width="400px"
            height="200px"
          >
            <v-card
              light
              width="400px"
              height="200px"
            >
              <v-card-title
                class="justify-center display-1"
              >
                Alerta
              </v-card-title>
              <v-card-text
                class="pt-5 title"
              >
                {{ alertMsg }}
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'General',
  data: () => ({
    perfilDialog: false,
    name: '',
    email: '',
    password: '',
    passConfirm: '',
    id: '',
    alertDialog: false,
    alertMsg: '',
    nameRules: [
      v => !!v || 'El nombre no puede estar vacio'
    ],
    emailRules: [
      v => !!v || 'El email no puede estar vacio',
      v => /.+@.+\..+/.test(v) || 'El email debe ser valido'
    ],
    passRules: [
      v => v.length >= 8 || v.length === 0 || 'La contraseña debe tener al menos 8 caracteres',
      v => v.length === 0 || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){8,32}$/.test(v) || 'La contraseña debe contener una mayuscula, una minuscula, un caracter especial y un numero'
    ]
  }),
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      await this.$axios.get('/user')
        .then((res) => {
          if (res.data.error === null) {
            this.name = res.data.data.name
            this.email = res.data.data.email
            this.id = res.data.data._id
          } else if (res.data.error === 'Session Expired') {
            this.logout()
          }
        })
    },
    async guardar () {
      if (!this.$refs.frmUpdate.validate()) {
        this.alertMsg = 'Datos no validos'
        this.alertDialog = true
        setTimeout(() => {
          this.alertDialog = false
        }, 1500)
        return 1
      }
      const sendData = {
        name: this.name,
        email: this.email,
        password: this.password,
        passConfirm: this.passConfirm
      }
      await this.$axios.put(`/user/${this.id}`, sendData)
        .then((res) => {
          if (res.data.error === null) {
            this.alertMsg = 'Usuario guardado'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1000)
            this.noteDialog = false
            this.loadUser()
          } else {
            // eslint-disable-next-line no-console
            console.log(res.data)
          }
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async eliminar () {
      await this.$axios.delete(`/user/${this.id}`)
        .then((res) => {
          if (res.data.error === null) {
            this.alertMsg = 'Usuario eliminado'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1000)
            localStorage.removeItem('token')
            this.$router.push('/')
          }
        })
    },
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>
