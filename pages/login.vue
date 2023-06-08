<template>
  <Login />
</template>

<script>
import Login from '~/components/login_card.vue'
export default {
  name: 'LoginPage',
  components: {
    Login
  },
  layout: 'login'
}
</script>
