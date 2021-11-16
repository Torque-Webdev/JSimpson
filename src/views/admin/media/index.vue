<template>
  <section id="media">
    <v-container id="media-nav">
      <v-tabs
        center-active
        color="primary"
        class="mt-4 mx-4"
      >
        <v-tab
          to="/admin/media/images"
        >
          Images
        </v-tab>
      </v-tabs>
    </v-container>

    <router-view class="pt-3" />
  </section>
</template>
