<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="(img, index) in images"
          :key="index"
          cols="4"
          class="mx-auto text-center"
        >
          <v-img :src="img.url" />
          <v-row
            class="py-5 flex-column"
            align="center"
            justify="center"
          >
            <span>Name: {{ img.name }}</span>
            <span>Alt: {{ img.alt }}</span>
          </v-row>
          <v-btn @click.native="deleteImage(img.id)">
            Delete
          </v-btn>
        </v-col>
      </v-row>
      <ui-message :msg.sync="msg" />
    </v-container>
  </div>
</template>

<script>
  export default {
    computed: {
      images () {
        return this.$store.getters['images/getImages']
      },
      msg () {
        return this.$store.getters['images/getMsg']
      },
    },
    methods: {
      deleteImage (id) {
        this.$store.dispatch('images/deleteImage', id)
      },
    },
  }
</script>
