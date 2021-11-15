
<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  export default {
    name: 'App',
    created () {
      this.$store.dispatch('about/setContent')
      this.$store.dispatch('head/setContent')
      this.$store.dispatch('gallery/setContent')
      this.$store.dispatch('promo/setContent')
      this.$store.dispatch('awards/setContent')
      this.$store.dispatch('skills/setContent')
      this.$store.dispatch('images/setImages')
      this.$store.dispatch('videos/setVideos')
    },
  }
</script>
