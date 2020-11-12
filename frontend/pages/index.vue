<template>
  <v-row v-if="items" justify="center" align="start" no-gutters class="item-list-page">
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
                @click="$router.push({ path: `/items/edit/${item.id}` })"
              >
                編集
              </v-btn>
              <v-btn
                elevation="0"
                color="primary"
                small
                @click="deleteItem(item.id)"
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

<script lang="ts">
import Vue from 'vue';
import { getItems, deleteItem } from '@/utils/mock-api';
import { Item } from '@/types';

export default Vue.extend({
  data(): {
    items: Item[] | null,
    page: number,
    pageCount: number,
    itemsPerPage: number,
    viewResults: number[],
    headers: object[],
  } {
    return {
      items: null,
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
    };
  },
  methods: {
    deleteItem(id: number){
      this.items = deleteItem(id);
    }
  },
  created(){
    this.items = getItems();
  },
});
</script>

<style lang="scss">

.item-list-page {
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
}

</style>
