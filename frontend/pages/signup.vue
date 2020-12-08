<template>
  <v-row
    justify="center"
    no-gutters
    class="signup-page"
  >
    <v-col col="12" lg="9">
      <h2 class="my-4 py-1">ユーザー作成</h2>
    </v-col>

    <v-col col="12" lg="6">
      <p style=" color: red; fontSize: 28px; ">現在、新規ユーザーの作成を停止しています。</p>

      <v-card outlined class="mx-auto mt-5">
        <v-col col="12" lg="6" class="mx-auto">
          <v-form class="mt-3">
            <v-text-field v-model="form.name" label="ユーザー名" outlined dense />

            <v-text-field v-model="form.email" label="メール" outlined dense />

            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="パスワード"
              v-model="form.password"
              outlined
              dense
              @click:append="showPassword = !showPassword"
            />

            <v-card-actions>
              <v-btn class="info mx-auto" elevation="0" @click="submit" disabled>ユーザー作成</v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data(): {
    form: { name: string, email: string, password: string },
    menu: boolean,
    showPassword: boolean,
  } {
    return {
      form: { name: '', email: '', password: '' },
      menu: false,
      showPassword : false,
    };
  },
  methods: {
    async submit(){
      const url = `https://${process.env.API_HOST}/signup`;
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.API_KEY}`,
        },
        body: JSON.stringify({ ...this.form }),
      };

      try {
        const response: Response = await fetch(url, options);

        if(response.ok){
          this.form = { name: '', email: '', password: '' };
          alert('ユーザーが作成されました');
        }
      } catch (err) {
        console.error('[ ERR ]', err);
      }
    },
  },
});
</script>

<style lang="scss">

.signup-page {
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