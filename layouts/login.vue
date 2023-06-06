<template>
  <v-app>
    <v-row class="centrado">
      <Nuxt />
    </v-row>
    <v-footer padless>
      <v-col
        class="text-center"
        cols="12"
      >
        Made by Moises Badajoz
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
.centrado {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: lightcyan;
}
</style>
