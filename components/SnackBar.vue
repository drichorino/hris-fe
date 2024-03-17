<template>
  <v-snackbar v-model="show" :timeout="timeout" :color="color" absolute>
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="close">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SnackBar',
  props: {
    value: Boolean,
    message: String,
    timeout: {
      type: Number,
      default: 4000,
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: this.value as boolean,
    };
  },
  watch: {
    value(val: boolean) {
      this.show = val;
    },
  },
  methods: {
    close() {
      this.show = false;
      this.$emit('input', this.show);
    },
  },
});
</script>
