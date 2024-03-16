<template>
  <v-container fluid class="d-flex vertical-center"> 
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-6">
          <SimpleForm
            :fields="loginFields"
            buttonText="Login"
            buttonColor="success"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>




<script lang="ts">
import Vue from 'vue';
import SimpleForm from '@/components/SimpleForm.vue'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'empty',
  components: {
    SimpleForm,
  },
  data: () => ({
    loginFields: [
      { label: 'Username', icon: 'mdi-account', model: '', type: 'text' },
      { label: 'Password', icon: 'mdi-lock', model: '', type: 'password' },
    ],
  }),
});
</script>

<style lang="scss">
.vertical-center {
  display: grid;
  place-items: center; /* Center both horizontally and vertically */
  height: 90vh; 
}
</style>
