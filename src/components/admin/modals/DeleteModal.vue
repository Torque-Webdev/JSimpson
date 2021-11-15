<template>
  <v-dialog
    v-model="deleteModal"
    max-width="500px"
    persistent
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar
          flat
          dark
          color="primary"
        >
          <v-toolbar-title>Delete confirm</v-toolbar-title>
          <v-spacer />
          <v-btn
            icon
            @click="cancel"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="black--text">
        <span
          class="error--text"
        >Are you sure you want to permanently delete -
        </span>
        {{ item.title }} /
        {{ item.name }}
      </v-card-text>
      <v-btn
        color="primary"
        @click.native="cancel"
      >
        Cancel
      </v-btn>
      <v-btn
        color="error"
        @click.native="confirm"
      >
        Delete
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      confirmation: {
        type: Boolean,
        default: false,
      },
      modal: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      deleteModal: {
        get () {
          return this.modal
        },
        set (newVal) {
          this.$emit('update:modal', newVal)
        },
      },
    },
    methods: {
      confirm () {
        this.$emit('update:confirmation', true)
        this.close()
      },
      cancel () {
        this.$emit('update:confirmation', false)
        this.close()
      },
      close () {
        this.deleteModal = false
      },
    },
  }
</script>
