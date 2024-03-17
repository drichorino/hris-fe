<template>
    <v-app>
        <v-main>
            <v-container>
                <Nuxt />
                <div class="snackbar-div text-center">
                    <SnackBar
                        :key="snackbarKey"
                        v-model="snackbar"
                        :message="snackbarMessage"
                        :color="snackbarColor"
                        :timeout="snackbarTimeout"
                    />
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { snackbarService } from '~/services/snackbarService '
import SnackBar from '~/components/SnackBar.vue'

export default Vue.extend({
    components: {
        SnackBar
    },

    data() {
        return {
            snackbar: false,
            snackbarMessage: '',
            snackbarColor: 'success',
            snackbarTimeout: 5000,
            snackbarKey: 0,
        }
    },

    created() {
        snackbarService.vm.$on('show-snackbar', this.showSnackbar)
    },

    beforeDestroy() {
        snackbarService.vm.$off('show-snackbar', this.showSnackbar)
    },

    methods: {
        showSnackbar(options: {
            message: string
            color: string
            timeout: number
        }) {
            this.snackbar = false
            this.snackbarMessage = options.message
            this.snackbarColor = options.color
            this.snackbarTimeout = options.timeout
            this.snackbar = true
            this.snackbarKey++;
        },
        resetSnackbar() {
            this.snackbar = false
            this.snackbarMessage = ''
            this.snackbarColor = ''
            this.snackbarTimeout = 5000 
        }
    }
})
</script>
