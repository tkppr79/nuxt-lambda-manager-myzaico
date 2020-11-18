<template>
  <div>
    <div
      v-for="filterSet in filterSets"
      :key="filterSet.id"
    >
      <v-card
        v-if="filterSet.type === 'text' && filterSet.filters[0].targetColumn"
        outlined
        class="text-filter mb-2 pa-1"
      >
        <h5 class="px-4 pt-2">テキストフィルター</h5>

        <TextFilter
          :label="filterSet.filters[0].targetColumn.label"
          :searchString="filterSet.filters[0].searchString"
          :checkbox="filterSet.filters[0].checkbox"
          @set-checkbox="$set(filterSet.filters[0], 'checkbox', $event)"
          @set-search-string="$set(filterSet.filters[0], 'searchString', $event)"
        />
      </v-card>

      <v-card v-else-if="filterSet.type === 'range' && filterSet.filters[0].targetColumn" outlined class="mb-2 pa-1">
        <h5 class="px-4 pt-2">レンジフィルター</h5>

        <RangeFilter
          :targetColumn="filterSet.filters[0].targetColumn.label"
          :checkbox="filterSet.filters[0].checkbox"
          :range="filterSet.filters[0].range"
          @set-checkbox="$set(filterSet.filters[0], 'checkbox', $event)"
          @set-range="$set(filterSet.filters[0], 'range', $event)"
        />
      </v-card>

      <v-card v-else-if="filterSet.type === 'tag' && filterSet.tagString" outlined class="mb-2 pa-2">
        <h5 class="px-4 pt-2">タグフィルター</h5>

        <TagFilter :filters="filterSet.filters" />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
import TextFilter from '@/components/TextFilter.vue';
import RangeFilter from '@/components/RangeFilter.vue';
import TagFilter from '@/components/TagFilter.vue';
import { FilterSet } from '@/types';

interface Data {}
interface Methods {}
interface Computed {}
interface Props {
  filterSets: FilterSet[]
}

const options: ThisTypedComponentOptionsWithRecordProps<Vue, Data, Methods, Computed, Props> = {
  components: {
    TextFilter,
    RangeFilter,
    TagFilter,
  },
  props: {
    filterSets: { required: true },
  },
}

export default Vue.extend(options)
</script>
