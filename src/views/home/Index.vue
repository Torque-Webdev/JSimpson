<template>
  <v-app>
    <head-video />

    <about-joanna />

    <gallery />

    <promo />

    <archievments />

    <twitter-social />

    <get-in-touch />
  </v-app>
</template>

<script>
  export default {
    name: 'CoreView',

    components: {
      GetInTouch: () => import('@/components/home/GetInTouch'),
      AboutJoanna: () => import('@/components/home/AboutJoanna'),
      HeadVideo: () => import('@/components/home/Head'),
      Promo: () => import('@/components/home/Promo'),
      TwitterSocial: () => import('@/components/home/TwitterSocial'),
      Archievments: () => import('@/components/home/Achievments'),
      Gallery: () => import('@/components/home/Gallery'),
    },
  }
</script>
