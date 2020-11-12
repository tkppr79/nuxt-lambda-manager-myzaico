<template>
  <v-row
    v-if="form"
    justify="center"
    no-gutters
    class="item-edit-page"
  >
    <v-col col="12" lg="9">
      <h2 class="my-4 py-1">アイテム編集</h2>
    </v-col>

    <v-col col="12" lg="6">
      <v-card outlined class="mx-auto mt-5">
        <v-col col="12" lg="6" class="mx-auto">
          <v-form class="mt-3">
            <v-text-field v-model="form.tags" label="タグ" outlined dense class="centered-input" />

            <v-text-field v-model="form.name" label="アイテム名" outlined dense class="centered-input" />

            <v-text-field v-model="form.sku" label="SKU" outlined dense class="centered-input" />

            <v-text-field v-model="form.manufacturer" label="メーカー" outlined dense class="centered-input" />

            <v-text-field v-model="form.listPrice" label="価格" outlined dense class="centered-input" />

            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="発売日"
                  v-model="form.releaseDate"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  readonly
                  class="centered-input"
                />
              </template>
              <v-date-picker v-model="form.releaseDate" @input="menu = false" />
            </v-menu>

            <v-card-actions>
              <v-btn class="info mx-auto" @click="submit">更新</v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { getItem, putItem } from '@/utils/mock-api';
import { Item } from '@/types';

export default Vue.extend({
  data(): {
    form: Item | null,
    menu: boolean,
  } {
    return {
      form: null,
      menu: false,
    };
  },
  methods: {
    submit(){
      const newItem = JSON.parse(JSON.stringify(this.form));
      newItem.listPrice = parseInt(newItem.listPrice, 10);
      putItem(newItem);
    }
  },
  created(){
    this.form = getItem(parseInt(this.$route.params.id, 10));
  },
});
</script>

<style lang="scss">

.item-edit-page {
  h2 {
    text-align: center;
    border-top: solid 1px rgb(194, 194, 194);
    border-bottom: solid 1px rgb(194, 194, 194);
  }

  .centered-input input {
    text-align: center
  }
}

</style>
