<template>
  <div>
    <v-btn
      class="mx-1"
      @click.native="upload"
    >
      Multi Upload
    </v-btn>

    <v-dialog
      v-model="uploadImage"
      persistent
      scrollable
    >
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-toolbar-title>Multi upload</v-toolbar-title>
            <v-spacer />
            <v-btn
              icon
              @click="closeUpload"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-file-input
                v-model="files"
                prepend-icon="mdi-camera"
                multiple
                label="File input"
                aria-describedby="Muiti image upload"
                accept="image/jpeg image/png"
              >
                <template #selection="{ text }">
                  <v-chip
                    small
                    label
                    color="primary"
                  >
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
              <v-row>
                <v-col
                  v-for="(img, index) in uploadImages"
                  :key="index"
                  class="pt-3"
                  cols="6"
                  md="4"
                >
                  <img
                    v-if="img"
                    :src="img.url"
                    :alt="img.alt"
                    style="width:100%; height:auto"
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            class="mx-1"
            :disabled="files.length == 0"
            @click="uploadImagesMethod"
          >
            Upload
          </v-btn>
          <v-btn
            color="error"
            class="mx-1"
            @click.native="closeUpload"
          >
            Close
          </v-btn>
        </v-card-actions>

        <transition name="fade">
          <ui-message :msg="uploadMsg" />
        </transition>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      images: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        files: [],
        uploadImage: false,
        uploadImages: [],
      }
    },
    computed: {
      uploadMsg () {
        return this.$store.getters['images/getMsg']
      },
      imgs () {
        return this.uploadImages
      },
    },
    methods: {
      reset () {
        this.files = []
        this.uploadImage = false
        this.uploadImages = []
      },
      upload () {
        this.uploadImage = true
      },
      closeUpload () {
        this.reset()
      },
      uploadImagesMethod () {
        this.files.forEach((file) => {
          file.alt = file.name
          this.$store.dispatch('images/multiUpload', file).then((response) => {
            this.uploadImages.push(response)
          })
          setTimeout(() => {
            this.reset()
            this.$emit('update:images', this.uploadedImages)
            this.$store.commit('images/SET_MSG', {})
          }, 4000)
        })
      },
    },
  }
</script>
