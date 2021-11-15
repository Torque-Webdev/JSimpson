<template>
  <div>
    <v-row>
      <ModalUploadModal
        :image.sync="img"
      />
      <ModalSelectImageModal
        :item.sync="img"
        :images="images"
      />
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      image: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      img: {
        get () {
          return this.image
        },
        set (newVal) {
          this.$emit('update:image', newVal)
        },
      },
      images () {
        return this.$store.getters['images/getImages']
      },
    },
  }
</script>
