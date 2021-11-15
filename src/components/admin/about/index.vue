<template>
  <div>
    <v-row class="pt-3">
      <v-col cols="12">
        <div class="d-flex">
          <UiImageUpload
            :image.sync="image"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      about: {
        type: Object,
        default: () => {},
      },
    },
    data () {
      return {
        imageProp: {},
      }
    },
    computed: {
      image: {
        get () {
          return this.imageProp
        },
        set (newVal) {
          this.$emit('update:about', newVal)
        },
      },
    },
  }
</script>
