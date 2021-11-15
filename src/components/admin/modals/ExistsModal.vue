<template>
  <v-dialog
    v-model="exist"
    persistent
  >
    <v-card-title class="pa-0">
      <v-toolbar
        flat
        dark
        color="primary"
      >
        <v-toolbar-title>Image exists with that name</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click.native="confirm"
          >
            Use
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-col
        cols="12"
        md="6"
        lg="4"
        class="py-3"
      >
        <p>Would you like to use this one ?</p>
      </v-col>
      <img
        :src="image.url"
        :alt="image.alt"
        class="img-fluid"
      >
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        size="sm"
        @click.native="confirm"
      >
        Yes
      </v-btn>
      <v-btn
        color="error"
        size="sm"
        @click.native="decline"
      >
        No
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      image: {
        type: Object,
        default: () => ({}),
      },
      exists: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        propImage: {},
      }
    },
    computed: {
      img () {
        return this.propImage
      },
      exist () {
        return this.exists
      },
    },
    methods: {
      close () {
        this.$emit('update:exists', false)
      },
      decline () {
        this.propImage = {}
        this.$emit('update:image', this.img)
        this.close()
      },
      confirm () {
        this.propImage = this.image
        this.$emit('update:image', this.img)
        this.close()
      },
    },
  }
</script>
