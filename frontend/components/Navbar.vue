<template>
  <v-app-bar flat clipped-left app>
    <div class="d-flex mx-auto" :style="{ width: '60%' }">
      <v-toolbar-title>Myzaico</v-toolbar-title>

      <v-spacer />

      <v-btn text @click="$router.push('/')">アイテム一覧</v-btn>
      <v-btn text @click="$router.push('/items/create')">アイテム登録</v-btn>
      <v-btn text @click="$router.push('/setting')">設定</v-btn>
      <v-btn outlined >ログイン</v-btn>
    </div>
  </v-app-bar>
</template>
