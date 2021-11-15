<template>
  <section
    id="archievments"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <skills />
      <awards />
    </v-row>
  </section>
</template>

<script>
  export default {
    components: {
      Awards: () => import('@/components/home/Awards'),
      Skills: () => import('@/components/home/Skills'),
    },
  }
</script>
