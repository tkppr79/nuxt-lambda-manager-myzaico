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

export default Vue.extend({
  components:{
    Navbar,
    Footer,
  },
  beforeMount(){
    if(!this.$store.getters['user/user'].name && window.location.pathname !== '/login' && window.location.pathname !== '/signup')
      window.location.replace(`${window.location.protocol}//${window.location.host}/login`);
  },
});
</script>
