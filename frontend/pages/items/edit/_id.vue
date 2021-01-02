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
              <v-btn elevation="0" class="info mx-auto" @click="submit">更新</v-btn>
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
    form: Item | null,
    menu: boolean,
    valid: boolean,
  } {
    return {
      form: null,
      menu: false,
      valid: true,
    };
  },
  methods: {
    async submit(){
      const formRef: any = this.$refs.form;
      if(!formRef.validate()) return;

      const url = `https://${process.env.API_HOST}/items`;
      const options = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
          "Authorization": this.$store.getters['user/user'].idToken,
        },
        body: JSON.stringify({ item: this.form }),
      };

      try {
        const response = await fetch(url, options);

        if(response.ok)
          this.$root.$emit('notify', { text: `アイテムを更新しました。`, type: 'info' });
      } catch (err) {
        console.error('[ ERR ]', err);
      }
    }
  },
  mounted(){
    const fetchItem = (async () => {
      if(!this.$store.getters['user/user'].name) return;

      const url = `https://${process.env.API_HOST}/items/${this.$route.params.id}`;
      const options = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
          "Authorization": this.$store.getters['user/user'].idToken,
        },
      };

      try {
        const response = await fetch(url, options);
        const fetchedData = await response.json();

        if(response.ok)
          this.form = fetchedData.Item;
      } catch (err) {
        console.error('[ ERR ]', err);
      }
    })();
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
