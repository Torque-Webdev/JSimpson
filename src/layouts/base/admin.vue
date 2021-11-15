<template>
  <v-app>
    <base-view />

    <base-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'BaseLayout',

    components: {
      BaseView: () => import('./View'),
      BaseFooter: () => import('./Footer'),
    },
  }
</script>
