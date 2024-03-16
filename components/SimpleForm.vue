<template>
    <v-form>
      <v-text-field
        v-for="(field, index) in fields"
        :key="index"
        :label="field.label"
        :prepend-icon="field.icon"
        :outlined="outlined"
        v-model="field.model"
        :type="field.type"
      ></v-text-field>
      <v-row justify="center">
      <v-btn
        :color="buttonColor"
        @click="submitForm"
      >
        {{ buttonText }}
      </v-btn>
    </v-row>
    </v-form>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  
  interface Field {
    label: string;
    icon: string;
    model: string;
    type?: string;
  }
  
  export default Vue.extend({
    name: "SimpleForm",
    props: {
      fields: {
        type: Array as () => Field[],
        required: true,
      },
      buttonText: {
        type: String,
        default: 'Submit',
      },
      buttonColor: {
        type: String,
        default: 'primary',
      },
      outlined: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      submitForm() {
        // Submission logic here
        this.fields.forEach((field: Field) => {
          console.log(`${field.label}:`, field.model);
        });
      },
    },
  });
  </script>
  