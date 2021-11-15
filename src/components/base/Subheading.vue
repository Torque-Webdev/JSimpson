<template>
  <component
    :is="tag"
    class="text-h4 v-heading mb-3 font-weight-light"
  >
    <slot />
  </component>
</template>

<script>
  export default {
    name: 'BaseSubheading',

    props: {
      tag: {
        type: String,
        default: 'h1',
      },
    },
  }
</script>
