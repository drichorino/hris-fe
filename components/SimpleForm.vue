<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field
            v-for="(field, index) in fields"
            :key="index"
            :label="field.label"
            :prepend-icon="field.icon"
            :outlined="outlined"
            v-model="field.data"
            :type="field.type"
            :autocomplete="field.autocomplete"
        ></v-text-field>
        <v-row justify="center">
            <v-btn :color="buttonColor" type="submit">
                {{ buttonText }}
            </v-btn>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

interface Field {
    label: string
    icon: string
    data: string
    type?: string
    autocomplete?: string
}

export default Vue.extend({
    name: 'SimpleForm',
    props: {
        fields: {
            type: Array as () => Field[],
            required: true
        },
        buttonText: {
            type: String,
            default: 'Submit'
        },
        buttonColor: {
            type: String,
            default: 'primary'
        },
        outlined: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        submitForm(): void {
            this.$emit('formSubmitted', this.fields)

            // Data Checker
            // this.fields.forEach((field: Field) => {
            //     console.log(`${field.label}:`, field.data)
            // })
        }
    }
})
</script>
