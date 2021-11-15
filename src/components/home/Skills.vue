<template>
  <v-col
    class="pa-5 secondary"
    cols="12"
    md="6"
  >
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <base-bubble-2
          style="transform: rotate(180deg) translateX(55%)"
        />
        <base-heading class="white--text text-center text-md-left">
          Skills
        </base-heading>

        <base-text class="mb-5 white--text">
          {{ skills.title }}
        </base-text>
      </v-col>

      <v-col
        v-for="(skill, i) in skills.items"
        :key="i"
        class="text-center mb-3"
        md="6"
      >
        <v-avatar
          class="elevation-6 mb-2"
          color="white"
          size="64"
          tile
        >
          <v-icon
            dark
            size="52"
            color="secondary"
          >
            mdi-{{ skill.icon }}
          </v-icon>
        </v-avatar>

        <base-text>
          <div
            class="mb-2 white--text font-weight-bold"
            v-text="skill.title"
          />
        </base-text>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
  export default {
    name: 'Skills',
    computed: {
      skills () {
        return this.$store.getters['skills/getContent']
      },
    },
  }
</script>
