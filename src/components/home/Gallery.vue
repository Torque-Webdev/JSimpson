<template>
  <v-row no-gutters>
    <v-col
      v-for="(img,index) in imgs"
      :key="index"
      sm="6"
      md="4"
      lg="3"
      @click="showImg(index)"
    >
      <v-img
        :src="img.url"
        height="350px"
      />
    </v-col>
    <!-- all props & events -->
    <vue-easy-lightbox
      :visible="visible"
      :imgs="imgs.forEach(img => img.url)"
      :index="index"
      @hide="handleHide"
    />
  </v-row>
</template>

<script>
  export default {

    data: () => ({
      visible: false,
      index: 0,
    }),

    computed: {
      imgs () {
        return this.$store.getters['gallery/getContent'].images
      },
    },

    methods: {
      showImg (index) {
        this.index = index
        this.visible = true
      },
      handleHide () {
        this.visible = false
      },
    },
  }
</script>
