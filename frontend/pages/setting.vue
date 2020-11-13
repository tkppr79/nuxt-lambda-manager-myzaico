<template>
  <v-row
    justify="center"
    no-gutters
    class="setting-page"
  >
    <v-col col="12" lg="12">
      <v-col col="12" lg="9" class="mx-auto">
        <h2 class="my-4 py-1">設定</h2>
      </v-col>
    </v-col>

    <v-col col="12" lg="3">
      <v-card outlined class="sidebar mr-3">
        <h2 class="text-center">フィルタープレビュー</h2>

        <div>
          <v-card-title class="justify-center">OR条件</v-card-title>
        </div>

        <v-divider />

        <div>
          <v-card-title class="justify-center">AND条件</v-card-title>
        </div>
      </v-card>
    </v-col>

    <v-col col="12" lg="9" class="">
      <v-card outlined class="pa-4">
        <FilterSetEditor
          v-for="(filterSet, index) in filterSets"
          :key="filterSet.id"
          :filter-set="filterSet"
          @set-filter-set="filterSets.splice(index, 1, $event)"
          @button-click="deleteFilterSet(filterSet.id)"
        />

        <div class="ma-3 pr-12">
          <v-col col="12" lg="6" xl="4" class="d-flex text-center mx-auto my-3 pl-12">
            <v-select
              :items="filterTypes"
              v-model="filterType"
              label="フィルタータイプ"
              item-text="label"
              item-value="value"
              dense
              outlined
              class="mr-2"
            />
            <v-btn
              elevation="0"
              color="primary"
              @click="addFilterSet(filterType)"
            >
              フィルター追加
            </v-btn>
          </v-col>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import FilterSetEditor from '@/components/FilterSetEditor.vue';
import { getFilterSets } from '@/utils/mock-api';
import { FilterSet } from '@/types';

export default Vue.extend({
  data(): {
    filterSets: FilterSet[],
    filterTypes: object[],
    filterType: string,
  } {
    return {
      filterSets: [],
      filterTypes: [
        { label: 'タグ', value: 'tag' },
        { label: 'テキスト', value: 'text' },
        { label: '範囲', value: 'range' },
      ],
      filterType: '',
    };
  },
  methods: {
    getUniqueStr() {
      return new Date().getTime().toString(16)  + Math.floor(1000 * Math.random()).toString(16);
    },
    addFilterSet(type: string) {
      if(!type){
        window.alert('フィルタータイプを選択してください');
        return;
      }

      const filterSet: FilterSet = {
        id: this.getUniqueStr(),
        condition: '',
        type,
        filters: [],
      };

      if(type === 'text' )
        filterSet.filters.push({ checkbox: false, targetColumn: null, searchString: '' });
      else if(type === 'range' )
        filterSet.filters.push({ checkbox: false, targetColumn: null, range: { start: 0, end: 0 } });
      else if(type === 'tag' )
        filterSet.tagString = '';

      this.filterSets.push(filterSet);
      this.filterType = '';
    },
    deleteFilterSet(id: string){
      this.filterSets = this.filterSets.filter(filterSet => filterSet.id !== id);
    },
  },
  created(){
    this.filterSets = getFilterSets();
  },
});
</script>

<style lang="scss">

.setting-page {
  h2 {
    text-align: center;
    border-top: solid 1px rgb(194, 194, 194);
    border-bottom: solid 1px rgb(194, 194, 194);
  }

  .sidebar {
    h2 {
      background-color: lightgray;
      color: white;
    }
  }
}

</style>
