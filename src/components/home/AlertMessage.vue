<template>
  <div>
    <v-col
      cols="12"
      class="text-center mt-2 d-none"
      :class="{ 'd-block': msg.status }"
    >
      <v-alert :type="msg.type">
        {{ msg.message }}
      </v-alert>
    </v-col>
  </div>
</template>

<script>
  export default {
    name: 'AlertMessage',
    props: {
      msg: {
        type: Object,
        default: () => {},
      },
    },
    watch: {
      msg (val) {
        if (val.status === true) {
          setTimeout(() => {
            this.msg.status = false
          }, 5000)
        }
      },
    },
  }
</script>
