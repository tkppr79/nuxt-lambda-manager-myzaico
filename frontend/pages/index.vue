<template>
  <v-row justify="center" align="start" no-gutters>
    <v-col cols="12" lg="3">
      <v-card outlined class="sidebar mr-3">
        <h2 class="text-center">フィルター</h2>

        <div>
          <v-card-title class="justify-center">OR条件</v-card-title>
        </div>

        <div>
          <v-card-title class="justify-center">AND条件</v-card-title>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" lg="9">
      <v-card outlined class="item-table">
        <v-col cols="12" lg="9" class="mx-auto">
          <v-select
            :items="viewResults"
            :value="itemsPerPage"
            @input="itemsPerPage = parseInt($event, 10)"
            label="表示件数"
            dense
            outlined
            class="ml-4 my-3"
            :style="{ width: '11%' }"
          />

          <v-data-table
            :headers="headers"
            :items="items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            class="elevation-1 px-4"
          >
            <template v-slot:item.name="{ item }">
              <router-link :to="`/items/${item.id}`" >
                {{ item.name }}
              </router-link>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                elevation="0"
                color="primary"
                small
              >
                編集
              </v-btn>
              <v-btn
                elevation="0"
                color="primary"
                small
              >
                削除
              </v-btn>
            </template>
          </v-data-table>

          <v-pagination v-model="page" :length="pageCount" class="pt-2" />
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    items: [
      { id: 1, tags: 'アパレル', name: 'testItem_1', sku: 'AAAAA', manufacturer: 'メーカーA', releaseDate: '2020-10-01', listPrice: 3000 },
      { id: 2, tags: '家電', name: 'testItem_2', sku: 'BBBBB', manufacturer: 'メーカーB', releaseDate: '2020-10-05', listPrice: 2000 },
      { id: 3, tags: 'パソコン', name: 'testItem_3', sku: 'CCCCC', manufacturer: 'メーカーC', releaseDate: '2020-10-10', listPrice: 3000 },
      { id: 4, tags: '本', name: 'testItem_4', sku: 'DDAAAD', manufacturer: 'メーカーD', releaseDate: '2020-10-15', listPrice: 4000 },
      { id: 5, tags: 'ゲーム', name: 'testItem_5', sku: 'EEEEE', manufacturer: 'メーカーE', releaseDate: '2020-10-20', listPrice: 1000 },
      { id: 6, tags: '食品', name: 'testItem_6', sku: 'FFFFF', manufacturer: 'メーカーF', releaseDate: '2020-10-25', listPrice: 7000 },
    ],
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
    viewResults: [5, 10, 20, 30, 40, 50, 100],
    headers: [
      { text: 'タグ', value: 'tags', sortable: false },
      { text: 'アイテム名', value: 'name', align: 'start' },
      { text: 'SKU', value: 'sku' },
      { text: '製造元', value: 'manufacturer' },
      { text: '発売日', value: 'releaseDate' },
      { text: '定価', value: 'listPrice' },
      { text: 'アクション', value: 'actions', sortable: false },
    ],
  }),
});
</script>

<style lang="scss">

.sidebar {
  h2 {
    background-color: lightgray;
    color: white;
  }
}

.item-table {
  min-height: 750px;

  .v-text-field__details,
  .v-messages {
    min-height: 0;
  }
}

</style>
