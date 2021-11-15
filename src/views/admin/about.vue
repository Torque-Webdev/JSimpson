<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-col
            cols="12"
            class="text-center"
          >
            <h1>About content</h1>
          </v-col>
          <v-col cols="12">
            <img
              v-if="about.img"
              :src="about.img.url"
              :alt="about.img.alt"
              style="width:auto; height:500px;"
            >
            <img
              v-else
              :src="defaultImg.url"
              :alt="defaultImg.alt"
              class="img-fluid"
            >
          </v-col>
          <admin-about-index :about.sync="about.img" />
          <ui-editor :content.sync="about.content" />
          <v-btn
            class="mt-10"
            @click="update"
          >
            Update about
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
  import { about } from '@/services/firebase'

  export default {
    data () {
      return {
        about: {
          img: {},
          content: '',
        },
        msg: {
          message: '',
          type: '',
        },
        defaultImg: {
          url:
            'https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7',
          alt: 'Placeholder Image',
        },
      }
    },
    computed: {
      aboutContent () {
        return this.$store.getters['about/getContent']
      },
    },
    created () {
      this.about = this.aboutContent
    },
    methods: {
      update () {
        about.doc(this.about.id).update({
          content: this.about.content,
          img: this.about.img,
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
