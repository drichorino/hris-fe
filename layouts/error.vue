<template>
  <v-app dark>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <v-icon size="120" class="mb-4">mdi-alert-octagon</v-icon>
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
          <v-btn color="red" dark large class="mt-5" :to="'/'">
            Return to Home Page
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue';

interface DataReturnType {
  pageNotFound: string;
  otherError: string;
}

interface ErrorLayoutVueInstance extends Vue {
  pageNotFound: string;
  otherError: string;
  error: {
    statusCode?: number;
  };
}

export default Vue.extend({
  name: 'ErrorLayout',
  layout: 'empty',
  props: {
    error: Object as () => ({
      statusCode: Number,
    }),
  },
  data(): DataReturnType {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred.',
    };
  },
  head(this: ErrorLayoutVueInstance) {
    const title = this.error && this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
});

</script>


<style scoped>
h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
