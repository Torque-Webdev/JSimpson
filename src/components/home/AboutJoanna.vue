<template>
  <section
    id="welcome"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          :src="about.img.url"
          height="100%"
          eager
          :alt="about.img.alt"
        />
      </v-col>

      <v-col
        class="align-content-space-between layout wrap"
        cols="12"
        md="6"
        :class="{ 'pa-5': $vuetify.breakpoint.smAndDown}"
      >
        <base-bubble-1
          style="transform: rotate(180deg) translateY(25%)"
        />

        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="10"
            md="6"
          >
            <base-heading class="text-h3 text-center text-md-left">
              Joanna Simpson
            </base-heading>
            <br>
            <base-text>
              <div v-html="about.content" />
              <br>
              <br>
              <base-btn
                href="https://www.youtube.com/watch?v=0SK04X4C9Wo"
                target="_blank"
              >
                Watch Showreel
              </base-btn>
            </base-text>
          </v-col>
        </v-row>

        <base-bubble-2
          style="transform: rotate(180deg) translate(-200px, -15%)"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
  export default {
    computed: {
      about () {
        return this.$store.getters['about/getContent']
      },
    },
  }
</script>
