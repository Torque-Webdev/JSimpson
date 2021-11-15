<template>
  <v-app>
    <base-app-bar />

    <base-view />

    <base-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'BaseLayout',

    components: {
      BaseAppBar: () => import('./AppBar'),
      BaseView: () => import('./View'),
      BaseFooter: () => import('./Footer'),
    },
  }
</script>
