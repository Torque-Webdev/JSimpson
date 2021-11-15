<template>
  <div>
    <v-row class="pt-3">
      <v-col
        cols="12"
        class="text-center"
      >
        <h1>Gallery content</h1>
      </v-col>
      <v-col cols="12">
        <div class="d-flex">
          <ModalMultiUpload
            :images.sync="images"
          />
          <ModalSelectImagesModal
            :images.sync="images"
          />
        </div>
      </v-col>
      <v-row>
        <v-col
          v-for="(img, index) in galleryContent"
          :key="index"
          cols="6"
          md="4"
        >
          <img
            :src="img.url"
            :alt="img.alt"
            style="width:100%; height:auto"
          >
          <v-btn
            elevation="2"
            outlined
            @click="removeItem(index, galleryContent)"
          >
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      gallery: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        imageProp: [],
        type: 'image',
      }
    },
    computed: {
      galleryContent: {
        get () {
          return this.gallery
        },
        set (newVal) {
          this.$emit('update:gallery', newVal)
        },
      },
      images: {
        get () {
          return this.imageProp
        },
        set (newVal) {
          newVal.forEach((img) => {
            this.galleryContent.push(img)
          })
        },
      },
    },
    methods: {
      removeItem (index, gallery) {
        gallery.splice(index, 1)
      },
    },
  }
</script>
