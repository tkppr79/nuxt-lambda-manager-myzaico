<template>
  <v-row
    v-if="item"
    justify="center"
    no-gutters
    class="item-show-page"
  >
    <v-col col="12" lg="9">
      <h2 class="my-4 py-1">アイテム詳細</h2>
    </v-col>

    <v-col col="12" lg="5" class="mx-auto mt-4">
      <v-card outlined class="px-4 py-2">
        <v-simple-table class="">
          <tbody>
            <tr>
              <th>タグ</th>
              <td>
                <v-chip
                  v-for="tag in tagArray"
                  :key="tag"
                  small
                  class="ma-1"
                  color="secondary"
                >
                  {{ tag }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <th>SKU</th>
              <td>{{ item.sku }}</td>
            </tr>
            <tr>
              <th>アイテム名</th>
              <td>{{ item.name }}</td>
            </tr>
            <tr>
              <th>メーカー</th>
              <td>{{ item.manufacturer }}</td>
            </tr>
            <tr>
              <th>発売日</th>
              <td>{{ item.releaseDate }}</td>
            </tr>
            <tr>
              <th>定価</th>
              <td>{{ item.listPrice }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Item } from '@/types';

export default Vue.extend({
  data():{
    item: Item | null
  } {
    return {
      item: null
    };
  },
  computed: {
    tagArray(): string[]{
      if(this.item && this.item.tags)
        return this.item.tags.trim().split(/\s+/);
      else
        return [];
    },
  },
  created(){
    const fetchItem = (async () => {
      const url = `https://${process.env.API_HOST}/items/${this.$route.params.id}`;
      const options = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const fetchedData = await response.json();

        if(response.ok)
          this.item = fetchedData.Item;
      } catch (err) {
        console.error('[ ERR ]', err);
      }
    })();
  },
});
</script>

<style lang="scss">

.item-show-page {
  h2 {
    text-align: center;
    border-top: solid 1px rgb(194, 194, 194);
    border-bottom: solid 1px rgb(194, 194, 194);
  }
}

</style>
