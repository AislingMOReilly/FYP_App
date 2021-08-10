<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/register">Register</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
      </div>
    </v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
    return : {
        sideNav: false,
        menuItems: [
          {icon: 'mdi-view-dashboard-outline', title: 'Dashboard', link: '/dashboard'},
          {icon: 'mdi-account-circle-outline', title: 'Profile', link: '/profile'},
          //{icon: 'mdi-account-plus', title: 'Register', link: '/register'},
          {icon: 'mdi-pencil-plus-outline', title: 'Register', link: '/register'},
          {icon: 'mdi-login', title: 'Sign in', link: '/login'},
        ],
      }
  }),
};
</script>
