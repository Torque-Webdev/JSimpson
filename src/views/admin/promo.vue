<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model.trim="promo.title"
            label="Title"
          />

          <v-text-field
            v-model.trim="promo.videoLink"
            label="Video link"
          />

          <v-btn
            class="mt-10"
            @click="update"
          >
            Update promo
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
  import { promo } from '@/services/firebase'
  export default {
    data () {
      return {
        promo: {
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
      promoContent () {
        return this.$store.getters['promo/getContent']
      },
    },
    created () {
      this.promo = this.promoContent
    },
    methods: {
      update () {
        promo.doc(this.promo.id).update({
          videoLink: this.promo.videoLink,
          title: this.promo.title,
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
