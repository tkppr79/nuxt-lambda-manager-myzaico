<template>
  <v-row
    justify="center"
    no-gutters
    class="login-page"
  >
    <v-col col="12" lg="9">
      <h2 class="my-4 py-1">ログイン</h2>
    </v-col>

    <v-col col="12" lg="6">
      <v-card outlined class="mx-auto mt-5">
        <v-col col="12" lg="6" class="mx-auto">
          <v-form ref="form" v-model="valid" lazy-validation class="mt-3">
            <v-text-field
              v-model="form.name"
              label="ユーザー名"
              :rules="[value => !!value || 'ユーザー名は必須です。']"
              outlined
              dense
            />

            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="パスワード"
              v-model="form.password"
              :rules="[value => !!value || 'パスワードは必須です。']"
              outlined
              dense
              @click:append="showPassword = !showPassword"
            />

            <v-card-actions>
              <v-btn class="info mx-auto" elevation="0" @click="submit">ログイン</v-btn>
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
    form: { name: string, password: string },
    menu: boolean,
    showPassword: boolean,
    valid: boolean,
  } {
    return {
      form: { name: '', password: '' },
      menu: false,
      showPassword : false,
      valid: true,
    };
  },
  methods: {
    async submit(){
      const formRef: any = this.$refs.form;
      if(!formRef.validate()) return;

      const url = `https://${process.env.API_HOST}/login`;
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
        const fetchedData = await response.json();

        if(response.ok){
          let uid = 0;

          fetchedData.userAttributes.forEach((attribute: { Name: string, Value: string }) => {
            if(attribute.Name === 'custom:uid')
              uid = parseInt(attribute.Value, 10);
          });

          const user = {
            id: uid,
            name: fetchedData.name,
            idToken: fetchedData.idToken,
            accessToken: fetchedData.accessToken,
            filterSets: []
          };

          this.$store.commit('user/setUser', user);
          document.cookie = `idToken=${fetchedData.idToken}; max-age=3600; samesite=lax;`;
          document.cookie = `accessToken=${fetchedData.accessToken}; max-age=3600; samesite=lax;`;
          this.$root.$emit('notify', { text: `【${user.name}】でログインしました。`, type: 'info' });
          this.$router.push('/');
        }
      } catch (err) {
        console.error('[ ERR ]', err);
      }
    },
  },
});
</script>

<style lang="scss">

.login-page {
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
