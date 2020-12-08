<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container v-if="$store.getters['user/initialized']" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
  components:{
    Navbar,
    Footer,
  },
  methods: {
    async verifyUser(){
      const token = this.getCookie('accessToken');

      if(!token){
        this.$store.commit('user/setUser', { id: 0, name: '', idToken: '', accessToken: '', filterSets: [] });
        this.$store.commit('user/setInitialization', true);
        return;
      }

      const url = `https://${process.env.API_HOST}/current-user`;
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
          "Authorization": this.getCookie('idToken')
        },
        body: JSON.stringify({ accessToken: token }),
      };

      try {
        const response: Response = await fetch(url, options as RequestInit);
        const fetchedData = await response.json();

        if(response.ok){
          let uid = 0;

          fetchedData.userAttributes.forEach((attribute: { Name: string, Value: string }) => {
            if(attribute.Name === 'custom:uid')
              uid = parseInt(attribute.Value, 10);
          });

          const user = {
            id: uid,
            name: fetchedData.name,
            idToken: this.getCookie('idToken'),
            accessToken: this.getCookie('accessToken'),
            filterSets: []
          };

          this.$store.commit('user/setUser', user);
        }
      } catch (err) {
        console.error('[ ERR ]', err);
      }

      this.$store.commit('user/setInitialization', true);
    },
    getCookie(key: string){
      const cookies = document.cookie.split(';');

      if(!cookies.length) return null;
      else{
        const filteredCookies = cookies.filter((str) => {
          const arr = str.split('=');

          if(arr[0].trim() === key)
            return true;
          else
            return false;
        });
        if(filteredCookies.length)
          return filteredCookies[0].split('=')[1];
        else
          return null;
      }
    },
  },
  beforeMount(){
    this.verifyUser();
  },
});
</script>
