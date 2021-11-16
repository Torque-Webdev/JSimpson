<template>
  <section
    id="promo-video"
    class="overflow-hidden relative primary"
  >
    <v-container>
      <v-row
        no-gutters
      >
        <h2 class="white--text text-center py-5">
          {{ promo.title }}
        </h2>
        <v-col
          style="height: 90vh"
          cols="12"
        >
          <iframe
            width="100%"
            height="100%"
            :src="promo.videoLink"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  export default {
    computed: {
      mobileRes () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return true
          case 'sm':
            return true
          default:
            return false
        }
      },
      promo () {
        return this.$store.getters['promo/getContent']
      },
    },
  }
</script>

<style scoped>

.relative {
  position:relative
}

</style>
