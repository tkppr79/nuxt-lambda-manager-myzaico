<template>
  <div class="range-filter d-flex align-center ma-1">
    <v-checkbox
      :checked="checkbox"
      @change="onCheckboxChange"
    />

    <v-subheader class="px-1">{{ targetColumn }}</v-subheader>

    <v-text-field
      label="start"
      :value="range.start"
      @input="onRangeStartChange"
      dense
      outlined
    />

    <div class="mx-2"> 〜 </div>

    <v-text-field
      label="end"
      :value="range.end"
      @input="onRangeEndChange"
      dense
      outlined
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
  checkbox: boolean;
  targetColumn: string;
  range: { start: number, end: number };
}

const options: ThisTypedComponentOptionsWithRecordProps<Vue, Data, Methods, Computed, Props> = {
  props: {
    checkbox: { required: true },
    targetColumn: { required: true },
    range: { required: true },
  },
  methods: {
    onCheckboxChange(newValue: boolean){
      this.$emit("set-checkbox", newValue);
    },
    onRangeStartChange(newValue: number){
      const clone = JSON.parse(JSON.stringify(this.range));
      clone.start = newValue;
      this.$emit("set-range", clone);
    },
    onRangeEndChange(newValue: number){
      const clone = JSON.parse(JSON.stringify(this.range));
      clone.end = newValue;
      this.$emit("set-range", clone);
    },
  },
}

export default Vue.extend(options)
</script>

<style lang="scss">

.range-filter {
  .v-text-field--outlined {
    margin-top: 10px !important;
  }

  .v-input--selection-controls {
    margin-top: 4px;
    padding-top: 4px;
  }

  .v-text-field__slot {
    input {
      text-align: right !important;
    }
  }

  .v-text-field__details,
  .v-messages {
    min-height: 0;
  }
}

</style>
