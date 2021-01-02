<template>
  <client-only>
    <v-app>
      <Navbar />
      <v-main>
        <v-container fluid>
          <nuxt />
        </v-container>
      </v-main>
      <Footer />
      <Notification />
    </v-app>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Notification from '@/components/Notification.vue';
import authorizationCheck from '@/utils/authorization';

export default Vue.extend({
  components:{
    Navbar,
    Footer,
  },
  beforeCreate(){
    if (process.client) {
      const result: { auth: boolean, redirectPath: string } = authorizationCheck(window.location.pathname, this.$store.getters['user/user']);

      if(!result.auth)
        this.$router.push(result.redirectPath);
    }

    this.$router.beforeEach((to, from, next) => {
      const result: { auth: boolean, redirectPath: string } = authorizationCheck(to.path, this.$store.getters['user/user']);

      if(result.auth)
        next();
      else
        next(result.redirectPath)
    });
  },
});
</script>
