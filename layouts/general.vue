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
        <v-btn icon x-large>
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
  </v-app>
</template>

<script>
export default {
  name: 'General'
}
</script>
