<template>
  <div class="text-filter d-flex ma-1">
    <v-checkbox
      :checked="checkbox"
      @change="onCheckboxChange"
    />
    <v-text-field
      :label="label"
      :value="searchString"
      @input="onSearchStringChange"
      outlined
      dense
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
  label: string;
  searchString: string;
}

const options:  ThisTypedComponentOptionsWithRecordProps<Vue, Data, Methods, Computed, Props> = {
  props: {
    checkbox: { required: true },
    label: { required: true },
    searchString: { required: true },
  },
  methods: {
    onCheckboxChange(newValue: boolean){
      this.$emit("set-checkbox", newValue);
    },
    onSearchStringChange(newValue: string){
      this.$emit("set-search-string", newValue.trim());
    },
  },
}

export default Vue.extend(options)
</script>

<style lang="scss">

.text-filter {
  .v-input--checkbox {
    margin-top: 4px;
  }

  .v-text-field__details,
  .v-messages {
    min-height: 0;
  }
}

</style>
