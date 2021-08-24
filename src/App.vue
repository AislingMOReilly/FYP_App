<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="sideNav">
      
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
  
        <v-list-item-content>
          <v-list-item-title>John Smith</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>


    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-app-bar-nav-icon>

      <v-app-bar-title class="hidden-xs-only" style="min-width: 150px;">Mole Analyser</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn
          v-if="userIsAuthenticated"
          text
          @click="onLogout">
          <v-icon left dark>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>
    
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
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
    </v-app-bar> -->

    <v-main>
      <v-container fill-height>
        <router-view />
      </v-container>  
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
      sideNav: false,
  }),
  computed: {
      menuItems () {
        let menuItems = [
          {icon: 'mdi-pencil-plus-outline', title: 'Register', link: '/register'},
          {icon: 'mdi-login', title: 'Login', link: '/login'},
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'mdi-view-dashboard-outline', title: 'Dashboard', link: '/dashboard'},
            {icon: 'mdi-account-circle-outline', title: 'Profile', link: '/profile'},
            {icon: 'mdi-image-multiple-outline', title: 'Images', link: '/images'},
            {icon: 'mdi-test-tube', title: 'Assessment', link: '/assessment'},
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }

};
</script>
