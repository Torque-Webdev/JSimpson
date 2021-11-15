<template>
  <section
    id="home-video"
    class="overflow-hidden relative"
  >
    <v-row
      no-gutters
    >
      <v-col
        style="height: 90vh"
        cols="12"
      >
        <iframe
          width="100%"
          height="100%"
          :src="head.videoLink"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </v-col>
    </v-row>
    <v-row :class="mobileRes ? 'd-none' : 'absolute'">
      <v-col
        cols="12"
        md="8"
        class="offset-md-3 pb-md-15"
      >
        <h1 class="text-h3 text-center text-lg-h1 text-md-2 font-weight-black text-md-right white--text">
          {{ head.title }}
        </h1>
      </v-col>
    </v-row>
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
      head () {
        return this.$store.getters['head/getContent']
      },
    },
  }
</script>

<style scoped>

.relative {
position:relative
}

.absolute {
  position:absolute;
  bottom:0;
  right: 0;
  z-index:10;
 }

.transform50 {
  transform: translateX(-50%);
  width:auto;
}
</style>
