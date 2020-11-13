<template>
  <v-row  class="filter-set-editor mb-2">
    <v-col col="12" lg="9" xl="6" class="mx-auto pa-0">
      <v-card outlined class="filter-set-editor-card pt-3">
        <v-col col="12" lg="6" class="mx-auto">
          <v-select
            label="条件"
            :items="filterSetConditions"
            :value="condition"
            @change="onConditionChange"
            dense
            outlined
          />

          <v-select
            label="タイプ"
            :items="filterSetTypes"
            :value="type"
            @change="onTypeChange"
            dense
            outlined
            item-text="label"
            item-value="value"
          />

          <template v-if="filterSet.type && filterSet.type === 'tag'">
            <v-text-field
              label="タグ一覧"
              :value="tagString"
              @input="onTagStringChange"
              outlined
              dense
            />
          </template>
          <template v-else-if="filterSet.type && filterSet.type === 'text'">
            <v-select
              label="対象カラム"
              :items="textTyepTargetColumns"
              :value="targetColumn"
              @change="onTargetColumnChange"
              dense
              outlined
              return-object
              item-text="label"
              item-value="value"
            />
          </template>
          <template v-else-if="filterSet.type && filterSet.type === 'range'">
            <v-select
              label="対象カラム"
              :items="rangeTypeTargetColumns"
              :value="targetColumn"
              @change="onTargetColumnChange"
              dense
              outlined
              return-object
              item-text="label"
              item-value="value"
            />
          </template>
        </v-col>

        <v-btn
          absolute top right
          elevation="0"
          @click="$emit('button-click')"
        >
          <v-icon role="img" aria-hidden="false">
            mdi-close-thick
          </v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { FilterSet } from '@/types';

interface Data {
  condition: string;
  type: string;
  targetColumn?: { label: string, value: string } | null;
  tagString?: string;
  filterSetConditions: string[],
  filterSetTypes: object[],
  textTyepTargetColumns: object[],
  rangeTypeTargetColumns: object[],
}
interface Methods {}
interface Computed {}
interface Props {
  filterSet: FilterSet;
}

const options:  ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  props: {
    filterSet: { required: true }
  },
  data () {
    let targetColumn: { label: string, value: string } | null;
    if(this.filterSet.filters[0] && this.filterSet.filters[0].targetColumn)
      targetColumn = this.filterSet.filters[0].targetColumn;
    else
      targetColumn = null;

    return {
      condition: this.filterSet.condition,
      type: this.filterSet.type,
      targetColumn,
      tagString: this.filterSet.tagString,
      filterSetConditions: [
        'OR',
        'AND'
      ],
      filterSetTypes: [
        { label: 'タグ', value: 'tag' },
        { label: 'テキスト', value: 'text' },
        { label: '範囲', value: 'range' },
      ],
      textTyepTargetColumns: [
        { label: 'アイテム名', value: 'name' },
        { label: '製造元', value: 'manufacturer' },
        { label: 'SKU', value: 'sku' },
      ],
      rangeTypeTargetColumns: [
        { label: '定価', value: 'listPrice' },
        { label: '発売日', value: 'releaseDate' },
      ],
    };
  },
  methods: {
    onConditionChange(newValue: string){
      const clone = JSON.parse(JSON.stringify(this.filterSet));
        clone.condition = newValue;
        this.$emit("set-filter-set", clone);
    },
    onTypeChange(newValue: string){
      const clone = JSON.parse(JSON.stringify(this.filterSet));
      clone.type = newValue;
      if(this.filterSet.type === 'tag')
        delete clone.tagString;
      clone.filters = [];

      if(newValue === 'text'){
        clone.filters.push({
          checkbox: false,
          targetColumn: null,
          searchString: '',
        });
      }else if(newValue === 'range'){
        clone.filters.push({
          checkbox: false,
          targetColumn: null,
          range: { start: 0, end: 0 },
        });
      }else if(newValue === 'tag'){
        clone.tagString = '';
      }

      this.$emit("set-filter-set", clone);
    },
    onTagStringChange(newValue: string){
      const clone = JSON.parse(JSON.stringify(this.filterSet));
      clone.tagString = newValue;
      clone.filters = [];
      const tagArray = newValue.trim().split(/\s+/);
      tagArray.forEach((tag) => {
        clone.filters.push({ checkbox: false, tag })
      });

      this.$emit("set-filter-set", clone);
    },
    onTargetColumnChange(newValue: { label: string, value: string }){
      const clone = JSON.parse(JSON.stringify(this.filterSet));
      clone.filters[0].targetColumn = newValue;
      this.$emit("set-filter-set", clone);
    },
  },
}
export default Vue.extend(options)
</script>

<style lang="scss">

.filter-set-editor {
  .filter-set-editor-card {
    position: relative;
  }

  .v-messages,
  .v-text-field__details {
    min-height: 0 !important;
  }
}

</style>
