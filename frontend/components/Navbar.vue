<template>
  <v-app-bar flat clipped-left app>
    <div class="d-flex mx-auto" :style="{ width: '60%' }">
      <v-toolbar-title>Myzaico</v-toolbar-title>

      <v-spacer />

      <template v-if="$store.getters['user/user'].name">
        <v-btn text @click="$router.push('/')">アイテム一覧</v-btn>
        <v-btn text @click="$router.push('/items/create')">アイテム登録</v-btn>
        <v-btn text @click="$router.push('/setting')">設定</v-btn>
        <v-btn outlined  @click="logout" >ログアウト</v-btn>
      </template>
      <template v-else>
        <v-btn text @click="$router.push('/signup')">ユーザー作成</v-btn>
        <v-btn outlined @click="$router.push('/login')">ログイン</v-btn>
      </template>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    async logout(){
      const url = `https://${process.env.API_HOST}/logout`;
      const options  = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
          "Authorization": this.$store.getters['user/user'].idToken,
        },
        body: JSON.stringify({ accessToken: this.$store.getters['user/user'].accessToken }),
      };

      try {
        const response: Response = await fetch(url, options as RequestInit);
        const fetchedData = await response.json();

        if(response.ok){
          this.$store.commit('user/setUser', { id: 0, name: '', idToken: '', accessToken: '', filterSets: [] });
          document.cookie = `idToken=; max-age=0; samesite=lax;`;
          document.cookie = `accessToken=; max-age=0; samesite=lax;`;
          this.$root.$emit('notify', { text: `ログアウトしました。`, type: 'info' });
          this.$router.push('/login');
        }
      } catch (err) {
        console.error('[ ERR ]', err);
      }
    },
  },
});
</script>
