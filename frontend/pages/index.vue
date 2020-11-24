<template>
  <v-row v-if="items.length" justify="center" align="start" no-gutters class="item-list-page">
    <v-col cols="12" lg="3">
      <v-card outlined class="sidebar mr-3 pb-4">
        <h2 class="text-center">フィルター</h2>

        <div>
          <v-card-title class="justify-center">OR条件</v-card-title>
          <FilterList :filterSets="orConditionList" class="px-4" />
        </div>

        <v-divider class="mx-2 mt-6" />

        <div>
          <v-card-title class="justify-center">AND条件</v-card-title>
          <FilterList :filterSets="andConditionList" class="px-4" />
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
            :items="filteredItems"
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
import FilterList from '@/components/FilterList.vue';
import { getItems, deleteItem, getFilterSets } from '@/utils/mock-api';
import { Item, FilterSet, Filter, Range } from '@/types';

export default Vue.extend({
  components: {
    FilterList,
  },
  data(): {
    items: Item[],
    filterSets: FilterSet[],
    page: number,
    pageCount: number,
    itemsPerPage: number,
    viewResults: number[],
    headers: object[],
    textColumns: string[],
    rangeColumns: string[],
  } {
    return {
      items: [],
      filterSets: [],
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
      textColumns: ['name', 'sku', 'manufacturer'],
      rangeColumns: ['releaseDate', 'listPrice'],
    };
  },
  computed: {
    orConditionList(): FilterSet[]{
      return this.filterSets.filter(filterSet => filterSet.condition === 'OR');
    },
    andConditionList(): FilterSet[]{
      return this.filterSets.filter(filterSet => filterSet.condition === 'AND');
    },
    filteredItems(): Item[]{
      let items: Item[] = this.applyFilters(this.items, this.orConditionList, this.getUnion);
      items = this.applyFilters(items, this.andConditionList, this.getIntersection);
      return items;
    },
  },
  methods: {
    async deleteItem(id: number){
      this.items = await deleteItem(id);
    },
    applyFilters(rawItems: Item[], filterSets: FilterSet[], callback: Function): Item[]{
      let filters: Filter[] = []
      filterSets.forEach(filterSet => {
        filters = filters.concat(filterSet.filters);
      });

      if(!filters.filter(filter => filter.checkbox).length) return rawItems;

      let filteredItems: Item[] = (callback === this.getIntersection) ? rawItems : [];

      for (let i = 0; i < filters.length; i++) {
        if(!filters[i].checkbox) continue;

        let items: Item[] = [];

        if(filters[i].hasOwnProperty('searchString')){
          const targetColumn: any = filters[i].targetColumn;

          if(targetColumn && typeof targetColumn === 'object'){
            const value: string = targetColumn.value;
            if(value)
              items = this.filterByText(this.items, filters[i].searchString, value, this.textColumns);
          }
        }else if(filters[i].hasOwnProperty('range')){
          const range: any = filters[i].range;
          const targetColumn: any = filters[i].targetColumn;

          if(range && typeof range === 'object' && targetColumn && typeof targetColumn === 'object'){
            const value: string = targetColumn.value;
            items = this.filterByRange(this.items, range, value, this.rangeColumns);
          }
        }else if(filters[i].hasOwnProperty('tag')){
          const tag: any = filters[i].tag;

          if(tag && typeof tag === 'string')
            items = this.filterByTag(this.items, tag);
        }

        filteredItems = callback(filteredItems, items);
      }

      return filteredItems;
    },
    getUnion(a: Item[], b: Item[]): Item[]{
      if(!a.length)
        return b;
      else if(!b.length)
        return a;

      const mergedArray = a.concat(b);
      const map = new Map(mergedArray.map(item => [item.sku, item]));
      return Array.from(map.values());
    },
    getIntersection(a: Item[], b: Item[]): Item[]{
      if(!a.length || !b.length) return [];

      return a.filter((aItem) => b.findIndex(bItem => bItem.sku === aItem.sku) !== -1);
    },
    filterByText(items: Item[], word: string | undefined, targetColumn: string, allowedColumns: string[]): Item[]{
      if(!word) return items;

      return items.filter((item) => {
        if(allowedColumns.includes(targetColumn)){
          const targetString = item[targetColumn];

          if(typeof targetString === 'string')
            return targetString.indexOf(word) !== -1;
          else
            return false;
        }
        else
          return false;
      });
    },
    filterByRange(items: Item[], range: Range, targetColumn: string, allowedColumns: string[]): Item[]{
      return items.filter((item) => {
        if(allowedColumns.includes(targetColumn))
          return (range.start <= item[targetColumn] && item[targetColumn] <= range.end);
        else
          return false;
      });
    },
    filterByTag(items: Item[], tag: string): Item[]{
      return items.filter((item) => item.tags.indexOf(tag) !== -1);
    },
  },
  created(){
    const fetchItems = (async () => {
      const fetchedItems = await getItems();
      this.items = JSON.parse(JSON.stringify(fetchedItems));
    })();
    const fetchFilterSets = (async () => {
      const fetchedFilterSets = await getFilterSets();
      this.filterSets = JSON.parse(JSON.stringify(fetchedFilterSets));
    })();
  },
});
</script>

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables";

.item-list-page {
  .sidebar {
    h2 {
      background-color: lightgray;
      color: white;
    }

    .v-subheader {
      font-size: 0.5rem;
      min-width: 40px;

      @media #{map-get($display-breakpoints, 'xl-only')}{
        font-size: 0.875rem;
      }
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
