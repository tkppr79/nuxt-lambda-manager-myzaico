<template>
  <div class="tag-filter">
    <v-checkbox
      v-for="filter in filters"
      :key="filter.tag"
      :label="filter.tag"
      v-model="filter.checkbox"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';

interface Data {}
interface Methods {}
interface Computed {}
interface Props {
  filters: { checkbox: boolean, tag: string }[];
}

const options: ThisTypedComponentOptionsWithRecordProps<Vue, Data, Methods, Computed, Props> = {
  props: {
    filters: { required: true },
  },
}

export default Vue.extend(options)
</script>

<style lang="scss">

.tag-filter {
  .v-input--selection-controls {
    margin-top: 5px;
    padding-left: 3px;
  }

  .v-messages {
    min-height: 0;
  }
}

</style>
