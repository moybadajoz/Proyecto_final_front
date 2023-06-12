<template>
  <div
    class="d-flex flex-wrap justify-space-around px-10 pt-1 mx-10"
    width="100%"
  >
    <v-hover
      v-for="(n, idx) in notesList"
      :key="idx"
      v-slot="{ hover }"
    >
      <v-card
        :elevation="hover ? 20 : 3"
        class="overflow-hidden mx-2 my-2 align-self-start"
        width="250px"
        height="230px"
        tile
        :color="n.color"
        @click="editar(n)"
      >
        <v-card-title class="d-inline-block subtitle-1 text-truncate pt-3 pb-0" style="max-width: 250px; color: #000">
          {{ n.title }}
        </v-card-title>
        <v-card-text class="caption" style="max-width: 250px; color: #000;">
          {{ n.content }}
        </v-card-text>
      </v-card>
    </v-hover>
    <v-btn
      fab
      right
      bottom
      absolute
      fixed
      color="green"
      width="70px"
      height="70px"
      class="mr-10 mb-16"
      @click="newNote()"
    >
      <v-icon class="display-3">
        mdi-plus
      </v-icon>
    </v-btn>
    <!--Dialogo crear y editar nota-->
    <div>
      <v-row justify="center">
        <v-dialog
          v-model="noteDialog"
          persistent
          max-width="600px"
          max-height="600px"
        >
          <v-card light max-height="600px" class="overflow-auto pt-2" :color="noteColor">
            <v-card
              width="100%"
              class="overflow-auto pb-0 px-1 pt-1"
              max-height="100px"
              flat
              color="transparent"
            >
              <v-textarea
                v-model="noteTitle"
                :value="noteTitle"
                label="Titulo"
                solo
                flat
                auto-grow
                rows="1"
                class="headline"
                background-color="transparent"
              />
            </v-card>
            <v-card
              class="overflow-auto pb-0 px-1"
              max-height="440px"
              flat
              color="transparent"
            >
              <v-textarea
                v-model="noteContent"
                :value="noteContent"
                max-height="600px"
                label="Escribe una nota"
                solo
                flat
                rows="1"
                auto-grow
                background-color="transparent"
                class="overflow-hidden pt-0"
              />
            </v-card>
            <v-card-actions>
              <v-menu
                v-if="noteModeEdit"
              >
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
                    Eliminar nota
                  </v-card-title>
                  <v-card-text>
                    Esta accion no se podra deshacer
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="warning">
                      Cancelar
                    </v-btn>
                    <v-btn color="error" @click="eliminar(noteId)">
                      Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
              <v-spacer />
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    color="cyan"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-palette
                    </v-icon>
                  </v-btn>
                </template>
                <v-color-picker
                  v-model="noteColor"
                  :swatches="swatches"
                  show-swatches
                  hide-canvas
                  hide-sliders
                  hide-inputs
                  mode="hexa"
                  flat
                />
              </v-menu>
              <v-btn
                color="warning"
                @click="noteDialog = false"
              >
                Cerrar
              </v-btn>
              <v-btn
                v-if="!noteModeEdit"
                dark
                color="success"
                @click="guardar()"
              >
                Guardar
              </v-btn>
              <v-btn
                v-else
                dark
                color="success"
                @click="update(noteId)"
              >
                Actualizar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
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
    <!--editar perfil-->
  </div>
</template>
<script>
export default {
  data: () => ({
    alertDialog: false,
    noteModeEdit: false,
    alertMsg: '',
    notesList: '',
    noteTitle: '',
    noteContent: '',
    noteColor: '#FFFFFF',
    noteDialog: false,
    swatches: [
      ['#FFFFFF'],
      ['#FFF176'],
      ['#4DD0E1'],
      ['#F06292'],
      ['#E57373'],
      ['#90A4AE'],
      ['#8D6E63'],
      ['#FF7043'],
      ['#9CCC65'],
      ['#29B6F6']
    ]
  }),
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
      return 0
    }
    this.loadNotes()
  },
  methods: {
    editar (note) {
      this.noteModeEdit = true
      this.noteTitle = note.title
      this.noteContent = note.content
      this.noteColor = note.color
      this.noteId = note._id
      this.noteDialog = true
    },
    async guardar () {
      if (!this.noteTitle && !this.noteContent) {
        this.alertMsg = 'La nota no puede estar vacia'
        this.alertDialog = true
        setTimeout(() => {
          this.alertDialog = false
        }, 1500)
        return 1
      }
      const sendData = {
        title: this.noteTitle,
        content: this.noteContent,
        color: this.noteColor
      }
      await this.$axios.post('/note', sendData)
        .then((res) => {
          if (res.data.msg === 'Success') {
            this.alertMsg = 'Nota guardada'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1000)
            this.noteDialog = false
            this.loadNotes()
          } else {
            this.alertMsg = 'Ocurrio un error'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1500)
          }
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async update (id) {
      if (!this.noteTitle && !this.noteContent) {
        this.alertMsg = 'La nota no puede estar vacia'
        this.alertDialog = true
        setTimeout(() => {
          this.alertDialog = false
        }, 1500)
        return 1
      }
      const sendData = {
        title: this.noteTitle,
        content: this.noteContent,
        color: this.noteColor
      }
      await this.$axios.put(`/note/${id}`, sendData)
        .then((res) => {
          if (res.data.msg === 'Success') {
            this.alertMsg = 'Nota guardada'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1000)
            this.loadNotes()
          } else {
            this.alertMsg = 'Ocurrio un error'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1500)
          }
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async eliminar (id) {
      await this.$axios.delete(`/note/${id}`)
        .then((res) => {
          if (res.data.msg === 'Success') {
            this.alertMsg = 'Nota eliminada'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1000)
            this.noteModeEdit = false
            this.noteTitle = ''
            this.noteContent = ''
            this.noteColor = ''
            this.noteId = ''
            this.noteDialog = false
            this.loadNotes()
          } else {
            this.alertMsg = 'Ocurrio un error'
            this.alertDialog = true
            setTimeout(() => {
              this.alertDialog = false
            }, 1000)
          }
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    newNote () {
      this.noteTitle = ''
      this.noteColor = '#FFFFFF'
      this.noteContent = ''
      this.noteModeEdit = false
      this.noteDialog = true
    },
    async loadNotes () {
      await this.$axios.get('/note')
        .then((res) => {
          this.notesList = res.data.data
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
}

</script>
