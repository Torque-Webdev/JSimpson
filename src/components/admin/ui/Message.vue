<template>
  <v-alert
    v-if="msg.message != ''"
    :type="msg.type"
  >
    {{ msg.message }}
  </v-alert>
</template>

<script>
  export default {
    props: {
      msg: {
        type: Object,
        required: true,
        default: () => ({}),
      },
    },
  }
</script>
