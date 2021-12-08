<template>
  <v-app>
    <v-app-bar dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="font-size: 35px; margin-right: 20px">SJ</v-toolbar-title>
      <v-toolbar-title>{{this.title}}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link to="/" style="text-decoration: none; color: inherit">
            <v-list-item>
              <v-list-item-title> Home </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/about" style="text-decoration: none; color: inherit">
            <v-list-item>
              <v-list-item-title> About </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer height="100"> </v-footer>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      title: "Scriptens Javavägar",
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
