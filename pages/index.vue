<template>
    <v-container fluid class="d-flex vertical-center">
        <v-row justify="center">
            <v-col cols="12" md="4">
                <v-card class="pa-6">
                    <SimpleForm
                        :fields="loginFields"
                        buttonText="Login"
                        buttonColor="success"
                        @formSubmitted="handleLogin"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import SimpleForm from '@/components/SimpleForm.vue'
import AccountAPI from '../api/account/api'
import { snackbarService } from '~/services/snackbarService '

interface FormData {
    [key: string]: any;
}

interface Field {
    label: string;
    name: string;
    icon: string;
    data: string;
    type: string;
}

interface LoginFormFields {
    username: string;
    password: string;
}

export default Vue.extend({
    name: 'LoginPage',
    layout: 'empty',
    components: {
        SimpleForm,
    },
    data: () => ({
        loginFields: [
            { label: 'Username', name: 'username', icon: 'mdi-account', data: '', type: 'text', autocomplete: 'username' },
            { label: 'Password', name: 'password', icon: 'mdi-lock', data: '', type: 'password', autocomplete: 'current-password' }
        ],

        snackbar: false,
        snackbarColor: '',
        responseMessage: '',
        timeout: 4000,
    }),

    methods: {
      async handleLogin(): Promise<void> {
            let formData: LoginFormFields = {
                username: '',
                password: '',
            };

            this.loginFields.forEach((field: Field) => {
                formData[field.name as keyof LoginFormFields] = field.data;
            });


            // Submit formData object to API
            const apiResponse: any = await AccountAPI.login(formData);
            console.log('API Response:', apiResponse.payload.message);
            if(apiResponse.payload.success){

                snackbarService.showSuccess(apiResponse.payload.message);
                setTimeout(() => {
                    this.$router.push('/dashboard');
                    }, 2000)
            } else {
                snackbarService.showError(apiResponse.payload.message.detail);
            }
        }

    }
})
</script>

<style lang="scss">
.vertical-center {
    display: grid;
    place-items: center; /* Center both horizontally and vertically */
    height: 90vh;
}
</style>
