<template>
  <v-col
    class="pa-5 white"
    cols="12"
    md="6"
  >
    <div
      class="d-none d-md-block"
      style="min-height: 200px"
    />

    <base-heading class="secondary--text text-center text-md-left pb-5">
      Awards
    </base-heading>

    <v-alert
      outlined
      color="secondary"
    >
      <v-row
        v-for="(award, i) in awards.items"
        :key="i"
        style="color: #69A1BB;"
      >
        <v-col
          class="text-uppercase"
          cols="6"
          v-text="award.name"
        />

        <v-col
          class="text-right"
          cols="6"
          v-text="`${award.text}`"
        />
      </v-row>
    </v-alert>

    <base-bubble-1 style="transform: translate(0%, 20%)" />
  </v-col>
</template>

<script>
  export default {
    computed: {
      awards () {
        return this.$store.getters['awards/getContent']
      },
    },
  }
</script>
