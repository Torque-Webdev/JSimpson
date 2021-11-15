<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model.trim="head.title"
            label="Title"
          />

          <v-text-field
            v-model.trim="head.videoLink"
            label="Video link"
          />

          <v-btn
            class="mt-10"
            @click="update"
          >
            Update head
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
  import { head } from '@/services/firebase'
  export default {
    data () {
      return {
        head: {
          videoLink: '',
          title: '',
        },
        msg: {
          message: '',
          type: '',
        },
      }
    },
    computed: {
      headContent () {
        return this.$store.getters['head/getContent']
      },
    },
    created () {
      this.head = this.headContent
    },
    methods: {
      update () {
        head.doc(this.head.id).update({
          videoLink: this.head.videoLink,
          title: this.head.title,
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
