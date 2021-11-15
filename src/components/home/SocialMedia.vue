<template>
  <div>
    <v-btn
      v-for="(item, i) in items.slice(0, large ? items.length : 2)"
      :key="i"
      fab
      class="ma-2"
      color="secondary"
      :small="!large"
      :href="item.url"
      target="_blank"
    >
      <v-icon
        dark
        v-text="item.icon"
      />
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      large: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          name: 'Twitter',
          icon: 'mdi-twitter',
          url: 'https://twitter.com/joanna_simpson',
        },
        {
          name: 'YouTube',
          icon: 'mdi-youtube',
          url: 'https://www.youtube.com/user/jobo2001/featured',
        },
        {
          name: 'Email',
          icon: 'mdi-email',
          url: 'mailto:joanna@joannasimpsonmedia.com',
        },
      ],
    }),
  }
</script>
