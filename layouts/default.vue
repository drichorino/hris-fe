<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <template v-slot:append>
                <div class="pa-2 mb-2">
                    <v-btn color="primary" block>Logout</v-btn>
                </div>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon
                    >mdi-{{
                        `chevron-${miniVariant ? 'right' : 'left'}`
                    }}</v-icon
                >
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>mdi-application</v-icon>
            </v-btn>
            <v-btn icon @click.stop="fixed = !fixed">
                <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="toggleTheme">
                <v-icon>{{
                    darkTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
                }}</v-icon>
            </v-btn>
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
        <v-navigation-drawer
            v-model="rightDrawer"
            :right="right"
            temporary
            fixed
        >
            <v-list>
                <v-list-item @click.native="right = !right">
                    <v-list-item-action>
                        <v-icon light> mdi-repeat </v-icon>
                    </v-list-item-action>
                    <v-list-item-title
                        >Switch drawer (click me)</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
        <!-- SNACKBAR -->
        <div class="snackbar-div text-center">
            <SnackBar
                :key="snackbarKey"
                v-model="snackbar"
                :message="responseMessage"
                :timeout="timeout"
                :color="snackbarColor"
            />
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import SnackBar from '~/components/SnackBar.vue'
import { snackbarService } from '~/services/snackbarService '

@Component({
    components: {
        SnackBar
    }
})
export default class DefaultLayout extends Vue {
    darkTheme: boolean = true
    clipped: boolean = false
    drawer: boolean = false
    fixed: boolean = false
    miniVariant: boolean = false
    right: boolean = true
    rightDrawer: boolean = false
    title: any = process.env.SITE_NAME

    items: Array<{ icon: string; title: string; to: string }> = [
        {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
        },
        {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire'
        }
    ]

    // Snackbar properties
    snackbar: boolean = false
    responseMessage: string = ''
    timeout: number = 4000
    snackbarColor: string = ''
    snackbarKey: number = 0

    toggleTheme(): void {
        this.darkTheme = !this.darkTheme
        this.$vuetify.theme.dark = this.darkTheme
        localStorage.setItem('darkTheme', JSON.stringify(this.darkTheme))
    }

    created(): void {
        const userPrefersDark = localStorage.getItem('darkTheme')
        if (userPrefersDark !== null) {
            this.darkTheme = JSON.parse(userPrefersDark)
            this.$vuetify.theme.dark = this.darkTheme
        } else {
            this.$vuetify.theme.dark = this.darkTheme
        }

        // Listen to snackbar events
        snackbarService.vm.$on('show-snackbar', this.showSnackbar)
    }

    beforeDestroy(): void {
        // Cleanup to avoid memory leaks
        snackbarService.vm.$off('show-snackbar', this.showSnackbar)
    }

    showSnackbar(options: {
        message: string
        color: string
        timeout: number
    }): void {
        this.snackbar = false
        this.responseMessage = options.message
        this.snackbarColor = options.color
        this.timeout = options.timeout
        this.snackbar = true
        this.snackbarKey++
    }
}
</script>

<style>
/* Your styles here */
</style>
