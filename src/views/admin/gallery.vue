<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <admin-gallery-index :gallery.sync="galleryData.images" />
          <v-btn
            class="mt-10"
            @click="update"
          >
            Update gallery
          </v-btn>
        </v-col>
      </v-row>
      <ui-message
        class="mt-2"
        :msg.sync="msg"
      />
    </v-container>
  </div>
</template>

<script>
  import { gallery } from '@/services/firebase'

  export default {
    data () {
      return {
        galleryData: {},
        msg: {},
      }
    },
    computed: {
      galleryContent () {
        return this.$store.getters['gallery/getContent']
      },
    },
    created () {
      this.galleryData = this.galleryContent
    },
    methods: {
      update () {
        gallery.doc(this.galleryData.id).update({
          images: this.galleryData.images,
        }).then(() => {
          this.msg = {
            message: 'Updated content',
            type: 'success',
          }
        })
      },
    },
  }
</script>
