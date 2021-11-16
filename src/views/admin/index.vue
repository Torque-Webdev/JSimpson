<template>
  <section id="admin">
    <v-container id="admin-nav">
      <v-toolbar
        flat
        class="mt-4 mx-4"
      >
        <v-toolbar-title>Website Dashboard</v-toolbar-title>
        <v-spacer />
        <router-link to="/">
          <v-icon class="mr-1">
            mdi-home
          </v-icon>Home
        </router-link>
        <a @click="logout()">
          <v-icon
            icon="ban"
            class="mr-1"
          />
          Logout
        </a>
      </v-toolbar>

      <v-tabs
        center-active
        color="primary"
        class="mt-4 mx-4"
      >
        <v-tab
          to="/admin/head"
        >
          Head
        </v-tab>
        <v-tab
          to="/admin/about"
        >
          About
        </v-tab>
        <v-tab
          to="/admin/gallery"
        >
          Gallery
        </v-tab>
        <v-tab
          to="/admin/promo"
        >
          Promo
        </v-tab>
        <v-tab
          to="/admin/skills"
        >
          Skills
        </v-tab>
        <v-tab
          to="/admin/awards"
        >
          Awards
        </v-tab>
        <v-tab
          to="/admin/media/"
        >
          Media
        </v-tab>
      </v-tabs>
    </v-container>

    <router-view class="pt-3" />
  </section>
</template>

<script>
  import { auth } from '@/services/firebase'

  export default {
    name: 'Admin',
    methods: {
      async logout () {
        await auth.signOut()
        location.href = '/'
      },
    },
  }
</script>
