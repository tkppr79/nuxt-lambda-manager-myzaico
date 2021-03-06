<template>
  <v-row
    justify="center"
    no-gutters
    class="item-create-page"
  >
    <v-col col="12" lg="9">
      <h2 class="my-4 py-1">アイテム登録</h2>
    </v-col>

    <v-col col="12" lg="6">
      <v-card outlined class="mx-auto mt-5">
        <v-col col="12" lg="6" class="mx-auto">
          <v-form ref="form" v-model="valid" lazy-validation class="mt-3">
            <v-text-field v-model="form.tags" label="タグ" outlined dense class="centered-input" />

            <v-text-field
              v-model="form.name"
              label="アイテム名"
              :rules="[
                value => !!value || 'アイテム名は必須です。',
                value => !!value && value.length < 33 || 'アイテム名は32文字以内で入力してください。',
              ]"
              outlined
              dense
              class="centered-input"
            />

            <v-text-field
              v-model="form.sku"
              label="SKU"
              :rules="[
                value => !!value || 'SKUは必須です。',
                value => !!value && value.length < 33 || 'SKUは32文字以内で入力してください。',
              ]"
              outlined
              dense
              class="centered-input"
            />

            <v-text-field
              v-model="form.manufacturer"
              label="メーカー"
              :rules="[
                value => !!value || 'メーカーは必須です。',
                value => !!value && value.length < 33 || 'メーカーは32文字以内で入力してください。',
              ]"
              outlined
              dense
              class="centered-input"
            />

            <v-text-field
              v-model.number="form.listPrice"
              label="価格"
              type="number"
              :rules="[
                value => !!value || '価格は必須です。',
                value => !!value && value.toString().length < 11 || '価格は10桁以内で入力してください。',
              ]"
              outlined
              dense
              class="centered-input"
            />

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
                  :rules="[value => !!value || '発売日は必須です。']"
                  outlined
                  dense
                  readonly
                  class="centered-input"
                />
              </template>
              <v-date-picker v-model="form.releaseDate" @input="menu = false" />
            </v-menu>

            <v-card-actions>
              <v-btn elevation="0" class="info mx-auto" @click="submit">登録</v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Item } from '@/types';

export default Vue.extend({
  data(): {
    form: Item,
    menu: boolean,
    valid: boolean,
  } {
    return {
      form: { id: 0, tags: '', name: '', sku: '', manufacturer: '', releaseDate: '', listPrice: 0 },
      menu: false,
      valid: true,
    }
  },
  methods: {
    async submit(){
      const formRef: any = this.$refs.form;
      if(!formRef.validate()) return;

      const getUrl = `https://${process.env.API_HOST}/items`;
      const getOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
          "Authorization": this.$store.getters['user/user'].idToken,
        },
      };

      let fetchedItems;

      try {
        const getResponse = await fetch(getUrl, getOptions);
        const getData = await getResponse.json();
        fetchedItems = getData.Items;
      } catch (err) {
        console.error('[ ERR ]', err);
      }

      let lastID;

      if(fetchedItems.length){
        const sortedItems = this.sortItemsById(fetchedItems);
        lastID = sortedItems[sortedItems.length - 1].id;
      }else{
        lastID = 0;
      }

      this.form.id = lastID + 1;

      const postUrl = `https://${process.env.API_HOST}/items`;
      const postOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
          "Authorization": this.$store.getters['user/user'].idToken,
        },
        body: JSON.stringify({ item: this.form }),
      };

      try {
        const postResponse: Response = await fetch(postUrl, postOptions);

        if(postResponse.ok){
          this.form = { id: 0, tags: '', name: '', sku: '', manufacturer: '', releaseDate: '', listPrice: 0 };
          formRef.resetValidation();
          this.$root.$emit('notify', { text: `アイテムが登録されました。`, type: 'info' });
        }
      } catch (err) {
        console.error('[ ERR ]', err);
      }
    },
    sortItemsById(items: Item[]): Item[] {
      items.sort((a,b) => {
        if (a.id > b.id)
          return 1;
        if (a.id < b.id)
          return -1;

        return 0;
      });

      return items;
    },
  },
});
</script>

<style lang="scss">

.item-create-page {
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
