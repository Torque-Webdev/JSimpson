<template>
  <v-app-bar
    v-scroll="onScroll"
    :color="!isScrolling ? 'transparent' : 'white'"
    fixed
    flat
  >
    <v-slide-x-transition>
      <v-img
        v-if="showLogo"
        :src="require('@/assets/logo.png')"
        contain
        height="50"
        width="100"
        class="position-unset"
      />
    </v-slide-x-transition>

    <v-spacer />

    <social-media />
  </v-app-bar>
</template>

<script>
  export default {
    name: 'BaseAppBar',

    components: {
      SocialMedia: () => import('@/components/home/SocialMedia'),
    },

    data: () => ({
      showLogo: false,
      isScrolling: false,
    }),

    methods: {
      onScroll () {
        const offset = window.pageYOffset
        this.isScrolling = offset > 50
        this.showLogo = offset > 200
      },
    },
  }
</script>

<style>
  .position-unset .v-image__image--contain {
      background-position: unset !important;
  }
</style>
