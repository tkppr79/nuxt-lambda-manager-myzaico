<template>
  <div class="text-center notification">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
      :multiLine="true"
      top
      content-class="text-center"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { NotificationOptions } from '@/types';

export default Vue.extend({
  data(): {
    snackbar: boolean,
    defaultTimeout: number,
    timeout: number,
    text: string,
    color: string,
    queue: NotificationOptions[],
  } {
    return {
      snackbar: false,
      defaultTimeout: 1500,
      timeout: -1,
      text: '',
      color: '',
      queue: [],
    };
  },
  methods: {
    notify(options: NotificationOptions){
      this.queue.push(options);
      if(this.queue.length === 1 && !this.snackbar)
        this.checkQueue();
    },
    checkQueue(){
      if(this.queue.length > 0){
        const options = this.queue.shift();
        if(options)
          this.display(options);
      }
    },
    display(options: NotificationOptions){
      if(options.type === 'info')
        this.color = 'green accent-4';
      else if(options.type === 'alert')
        this.color = 'amber accent-4';
      else if(options.type === 'error')
        this.color = 'error';

      this.text = options.text;
      this.timeout = options.timeout? options.timeout : this.defaultTimeout;
      this.snackbar = true;
      setTimeout(this.checkQueue, options.timeout? (options.timeout + 500) : (this.defaultTimeout + 500));
    },
  },
  mounted: function(){
    this.$root.$on('notify', this.notify);
  },
});
</script>

<style lang="scss">

.notification {
  .v-snack__content{
    font-weight: bold;
  }
}

</style>
